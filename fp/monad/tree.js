// Haskell 
// data RoseRoseTree a = RoseRoseTree a [RoseRoseTree a]
function RoseTree(node, forest) {
  this.node = node;
  this.forest = forest; 
}
// ap :: Applicative f => f a ~> a -> f a
RoseTree.of = function(x) {
  return new RoseTree(x, []);
}

// ap :: Apply f => f a ~> f (a -> b) -> f b
RoseTree.prototype.ap = function({node: f, forest: fs}) {
  const {node, forest} = this;
  return new RoseTree(f(node), [].concat(
    forest.map(x => x.map(f)),
    fs.map(m => this.node.ap(m))
  ));
}
// chain :: Cahin m => m a ~> (a -> m b)-> m b
RoseTree.prototype.chain = function(f) {
  const { node: x, forest: xs } = f(this.node);
  return new RoseTree(x, [].concat(xs,
    this.forest.map(x => x.chain(f))
  ))
}
// map :: Functor f => f a ~> (a -> b) -> f b
RoseTree.prototype.map = function(f) {
  return new RoseTree(f(this.node), this.forest.map(f));
}
// concat :: Semogroup a => a ~> a -> a
RoseTree.prototype.concat = function(b) {
  return new RoseTree(this.node, [].concat(this.forest, b))
}

module.exports = RoseTree;