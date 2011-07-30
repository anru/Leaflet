
RunQueue = L.Class.extend({
	
	includes: [L.Mixin.Events],
	
	initialize: function() {
		this._queue = [];
		this._index = 0;
		this._runNextBinded = L.Util.bind(this._runNext, this);
	},
	
	add: function(ctx, fn, args, timeout) {
		this._queue.push({
			'fn': fn,
			'ctx': ctx,
			'args': args,
			'timeout': timeout || 500
		});
	},
	
	run: function() {
		this._index = 0;
		this._runNext();
	},
	
	_runNext: function() {
		if (this._index == this._queue.length) {
			this.fire('end');
			return;
		}
		
		var runner = this._queue[this._index++];
		runner.fn.apply(runner.ctx, runner.args);
		window.setTimeout(this._runNextBinded, runner.timeout)
	}
	
});

