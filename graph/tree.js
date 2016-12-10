/**
 * Created by PP on 12/10/2016.
 */

function Node() {
    this.children = {};
    this.parent = null;
    this.value = null;
};

function insert(json, node, path, n, last) {
    if (n == last) {
        var key = path[last];
        if (key in  node.children) {
            var child = node.children[key];
            if (child.value != null) {
                console.error("duplicate entry key = " + key + " path = " + path);
            }
            child.value = {type: json.type, exercise_id : json.exercise_id, index : json.index, title : json.title, path : json.path};
            return node;
        }
        var child = new Node();
        child.parent = node;
        child.value = {type: json.type, exercise_id : json.exercise_id, index : json.index, title : json.title, path : json.path};
        node.children[key] = child;
        return node;
    } else if (n < last) {
        var key = path[n];
        if (key in node.children) {
            var child = node.children[key];
            child.parent = node;
            node.children[key] = insert(json, child, path, n + 1, last);
            return node;
        }
        var child = new Node();
        child = insert(json, child, path, n + 1, last);
        child.parent = node;
        node.children[key] = child;
        return node;
    } else {
        console.log('impossible branch')
    }
}

function ShowTree(node, n) {
    for (var key in node.children) {
        console.log( "{" + n + " : " + key + "}");
    }
    if (node.value != null) {
        console.log(n + " : ");
        console.log(node.value);
    }
    for (var key in node.children) {
        ShowTree(node.children[key], n + 1);
    }
}

function findTopicNode(node) {
    var current = node;
    while(current.value == null || current.value.type !== 'topic') {
        current = current.parent;
    }
    return current;
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

function collapseTreeIntoJson(node) {
    var leafNodes = [];
    var list = [node];
    while(list.length != 0) {
        var current = list.pop();
        if (isEmpty(current.children)) {
            leafNodes.push(current);
        } else {
            var children = current.children;
            for (var key in children) {
                list.push(children[key]);
            }
        }
    }
    var result = {};
    for (var i = 0; i < leafNodes.length; i++) {
        var lfNode = leafNodes[i];
        var topic = findTopicNode(lfNode).value.title;
        if (topic in result) {
            result[topic].push(lfNode.value);
        } else {
            result[topic] = [lfNode.value];
        }
    }
    return result;
}

function addDependency(topic1, topic2, json) {
    if (topic1 in json) {
        var entry = json[topic1];
        entry['lead_to'].push(topic2);
    } else {
        json[topic1] = {lead_to : [topic2], depend_on : []};
    }
    if (topic2 in json) {
        var entry = json[topic2];
        entry['depend_on'].push(topic1);
    } else {
        json[topic2] = {lead_to : [], depend_on : [topic1]};
    }
    return json;
}

