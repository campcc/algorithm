```js
const B = () => {
  console.log("render B");

  useEffect(() => {
    console.log("B");
  }, []);

  useLayoutEffect(() => {
    console.log("layout B");
  }, []);

  return <div>1</div>;
};

const A = () => {
  console.log("render A");

  useEffect(() => {
    console.log("A");
  }, []);

  useLayoutEffect(() => {
    console.log("layout A");
  }, []);

  return <B />;
};

// 执行顺序：render A → render B → layout B → layout A → B → A
```

```js
var source = [
  { id: 0, name: "a" },
  { id: 1, name: "b", pid: 0 },
  { id: 2, name: "c", pid: 0 },
  { id: 3, name: "d", pid: 1 },
  { id: 4, name: "e", pid: 2 },
  { id: 5, name: "f" },
  { id: 6, name: "h", pid: 5 },
  { id: 7, name: "i", pid: 5 },
  { id: 8, name: "j", pid: 6 },
  { id: 9, name: "k", pid: 7 },
];

function buildTree(data) {
  var res = [];

  for (var node of data) {
    if (!node.hasOwnProperty("pid")) {
      var children = generateChildren(node.id, data);
      var treeNode = { ...node, children };
      res.push(treeNode);
    }
  }

  return res;
}

function generateChildren(id, data) {
  var res = [];

  for (var node of data) {
    if (node.pid === id) {
      var children = generateChildren(node.id, data);
      res.push(children.length ? { ...node, children } : node);
    }
  }

  return res;
}
```
