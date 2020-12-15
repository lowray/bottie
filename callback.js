


export default class Middleware{
  constructor(context){
    this.ctx = context
  }
  use(fn){
    var self = this;

    this.go = (function(stack) {
      return function(next) {
        stack.call(self, function() {
          fn.call(self, self.ctx, next.bind(self));
        });
      }.bind(this);
    })(this.go);
  }

  go(next) {
    next();
  };
}

