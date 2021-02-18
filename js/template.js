Thing.prototype.TEMPLATES["空气"] = new Block({
	// id: 0,
	name: "空气"
});
Thing.prototype.TEMPLATES["命令方块"] = new Block({
	// id: 1,
	name: "命令方块",
	view: [1,0],
	block: {
		hardnesss: 3,
		face: [
			[1,0], [1,0], [0,0], [2,0], [1,0], [1,0]
		]
	},
	attr: {
		block: {
			onRightMouseDown: "status('command');false;",
			onShortTouch: "status('command');false;"
		},
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
/*Thing.prototype.TEMPLATES["基岩"] = new Block({
	// id: 2,
	name: "基岩",
	block: {
		face: FACE_URL[1]
	},
	attr: {}
});*/
Thing.prototype.TEMPLATES["草方块"] = new Block({
	// id: 2,
	name: "草方块",
	view: [4,0],
	block: {
		hardnesss: 3,
		face: [
			[4,0], [4,0], [3,0], [5,0], [4,0], [4,0]
		]
	},
	attr: {
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');message('绿色成就','【获得成就】<br/>恭喜获得成就：头上长草绿得快。');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
Thing.prototype.TEMPLATES["泥土"] = new Block({
	// id: 3.0,
	name: "泥土",
	view: [5,0],
	block: {
		face: [
			[5,0], [5,0], [5,0], [5,0], [5,0], [5,0]
		]
	},
	attr: {
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
Thing.prototype.TEMPLATES["松泥土"] = new Block({
	// id: 3.1,
	name: "松泥土",
	view: [5,0],
	block: {
		face: [
			[5,0], [5,0], [5,0], [5,0], [5,0], [5,0]
		]
	},
	attr: {
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
Thing.prototype.TEMPLATES["石头"] = new Block({
	// id: 4.0,
	name: "石头",
	view: [7,0],
	block: {
		face: [
			[7,0], [7,0], [7,0], [7,0], [7,0], [7,0]
		]
	},
	attr: {
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});

Thing.prototype.TEMPLATES["原石"] = new Block({
	// id: 4.1,
	name: "原石",
	view: [6,0],
	block: {
		face: [
			[6,0], [6,0], [6,0], [6,0], [6,0], [6,0]
		]
	},
	attr: {
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
Thing.prototype.TEMPLATES["沙子"] = new Block({
	// id: 5,
	name: "沙子",
	view: [0,1],
	block: {
		face: [
			[0,1], [0,1], [0,1], [0,1], [0,1], [0,1]
		]
	},
	attr: {
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
Thing.prototype.TEMPLATES["细橡木"] = new Block({
	// id: 6.0,
	name: "细橡木",
	view: [2,1],
	block: {
		face: [
			[2,1], [2,1], [1,1], [1,1], [2,1], [2,1]
		], geometry: new THREE.BoxBufferGeometry(40, 100, 40)
	},
	attr: {
		block: {
			transparent: true, //部分透明方块（不让相邻方块透明）
			noTransparent: [
				true,
				true,
				false,
				false,
				true,
				true
			] //不让本方块前后左右透明
		},
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
Thing.prototype.TEMPLATES["疏树叶"] = new Block({
	// id: 7.0,
	name: "疏树叶",
	view: [3,1],
	block: {
		face: [
			[3,1], [3,1], [3,1], [3,1], [3,1], [3,1]
		]
	},
	attr: {
		block: {
			transparent: true, //透明方块
			noTransparent: true, //不让本方块透明
			through: true //可穿过
		},
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
Thing.prototype.TEMPLATES["密树叶"] = new Block({
	// id: 7.1,
	name: "密树叶",
	view: [4,1],
	block: {
		face: [
			[4,1], [4,1], [4,1], [4,1], [4,1], [4,1]
		]
	},
	attr: {
		block: {
			transparent: true, //透明方块
			noTransparent: true, //不让本方块透明
			through: true //可穿过
		},
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
Thing.prototype.TEMPLATES["木板"] = new Block({
	// id: 8,
	name: "木板",
	view: [5,1],
	block: {
		face: [
			[5,1], [5,1], [5,1], [5,1], [5,1], [5,1]
		]
	},
	attr: {
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
Thing.prototype.TEMPLATES["砖"] = new Block({
	// id: 9,
	name: "砖",
	view: [6,1],
	block: {
		face: [
			[6,1], [6,1], [6,1], [6,1], [6,1], [6,1]
		]
	},
	attr: {
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);deskgood.hold.delete(1, deskgood.choice);false;"
	}
});
Thing.prototype.TEMPLATES["仙人掌"] = new Block({
	// id: 10,
	name: "仙人掌",
	view: [0,2],
	block: {
		face: [
			[0,2], [0,2], [7,1], [1,2], [0,2], [0,2]
		]
	},
	attr: {
		onPutToHead: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);deskgood.hold.delete(1, deskgood.choice);message('放到头上', '你自己要把方块放头上的，别怪我');false;",
		onPutToBody: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);deskgood.hold.delete(1, deskgood.choice);message('放到身上', '你自己要把方块放身上的，别怪我');false;",
		onPutToLeg: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);deskgood.hold.delete(1, deskgood.choice);false;",
		onPutToFoot: "deskgood.place(choice, {x:deskgood.pos.x/100, y:deskgood.pos.y/100-1, z:deskgood.pos.z/100});deskgood.hold.delete(1, deskgood.choice);deskgood.hold.delete(1, deskgood.choice);false;"
	}
});

// Tool
Thing.prototype.TEMPLATES["石镐"] = new Tool({
	// id: 11.2,
	name: "石镐",
	view: [2,2],
	attr: {
		hardnesss: 3
	}
});
Thing.prototype.TEMPLATES["石剑"] = new Tool({
	// id: 12.2,
	name: "石剑",
	view: [3,2],
	attr: {
		hardnesss: 3
	}
});
Thing.prototype.TEMPLATES["石斧"] = new Tool({
	// id: 13.2,
	name: "石斧",
	view: [4,2],
	attr: {
		hardnesss: 3
	}
});
Thing.prototype.TEMPLATES["石铲"] = new Tool({
	// id: 14.2,
	name: "石铲",
	view: [5,2],
	attr: {
		hardnesss: 3
	}
});
