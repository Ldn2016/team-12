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
            child.value = {type: json.type, exercise_id : json.exercise_id, title : json.title, path : json.path};
            return node;
        }
        var child = new Node();
        child.parent = node;
        child.value = {type: json.type, exercise_id : json.exercise_id, title : json.title, path : json.path};
        node.children[key] = child;
        return node;
    } else if (n < last) {
        var key = path[n];
        if (key in node.children) {
            var child = node.children[key];
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

var a = [
    {type : 'video', exercise_id : 13354, title : 'bfdb', path : 'a/b/c'},
    {type : 'topic', exercise_id : 1335, title : 'bfdfbdfbdb', path : 'a/b'},
    {type : 'excercise', exercise_id : 133532423, title : 'bgbgfdb', path : 'a/b/d'},
]

var b = new Node();

function ShowTree(node) {
    if (node.value != null) {
        console.log(node.value);
    }
    for (var key in node.children) {
        ShowTree(node.children[key]);
    }
}

for (var i = 0; i < a.length; i++) {
    var path = a[i].path.split('/');
    console.log(path);
    var last = path.length - 1;
    b = insert(a[i], b, path, 0, last);
    ShowTree(b);
    console.log("");
}
