class ChunkMap{
	constructor (size, seed, perloadLength){
		//区块大小
		this.size = {
			x: Math.round(size[1].x - size[0].x)+1,
			y: Math.round(size[1].y - size[0].y)+1,
			z: Math.round(size[1].z - size[0].z)+1,
			0: {
				x: Math.round(size[0].x), //-8
				y: Math.round(size[0].y), //0
				z: Math.round(size[0].z) //-8
			},
			1: {
				x: Math.round(size[1].x), //8
				y: Math.round(size[1].y), //256
				z: Math.round(size[1].z) //8
			}
		};
		
		//所有方块
		this.map = [];
		//所有区块信息(status, edit, weather)
		this.chunks = [];
		//区块预加载范围
		this.perloadLength = perloadLength;
		//种子设置
		if (seed){
			this.seed = {
				seed: seed.seed,
				h: {
					max: seed.height.max,
					min: seed.height.min,
					//ave: seed.height.ave,
					/*de: seed.height.de,*/
					q: seed.height.q,
					e: {
						max: seed.height.error.max,
						min: seed.height.error.min,
						q: seed.height.error.q
					}
				},
				d: {
					max: seed.dirt.max,
					min: seed.dirt.min,
					/*ave: seed.dirt.ave,
					de: seed.dirt.de,*/
					q: seed.dirt.q,
					e: {
						max: seed.dirt.error.max,
						min: seed.dirt.error.min,
						q: seed.dirt.error.q
					}
				},
				t: {
					max: 2,
					min: 0,
					forest: seed.type.forest,
					grassland: seed.type.grassland,
					desert: seed.type.desert,
					q: seed.type.q
				},
				tH: {
					plt:{
						min: seed.treeHeight.plant.min,
						max: seed.treeHeight.plant.max
					},
					max: seed.treeHeight.max,
					min: seed.treeHeight.min,
					q: seed.treeHeight.q,
					e: {
						max: seed.treeHeight.error.max,
						min: seed.treeHeight.error.min,
						q: seed.treeHeight.error.q
					}
				},
				oS: {
					max: seed.openStone.max,
					min: seed.openStone.min,
					q: seed.openStone.q
				},
				lS: {
					max: seed.leavesScale.max,
					min: seed.leavesScale.min,
					q: seed.leavesScale.q,
					e: {
						max: seed.leavesScale.error.max,
						min: seed.leavesScale.error.min,
						q: seed.leavesScale.error.q
					}
				},
				wR: {
					max: seed.weatherRain.max,
					min: seed.weatherRain.min,
					q: seed.weatherRain.q,
					e: {
						max: seed.weatherRain.error.max,
						min: seed.weatherRain.error.min,
						q: seed.weatherRain.error.q
					}
				}
			};
			this.seed.noise = new SimplexNoise(this.seed.seed);
			/* this.seed.h.k = (this.seed.h.max - this.seed.h.min)/2;
			this.seed.h.b = (this.seed.h.max + this.seed.h.min)/2;
			this.seed.s.k = (this.seed.s.max - this.seed.s.min)/2;
			this.seed.s.b = (this.seed.s.max + this.seed.s.min)/2; */
			this.seed.h.k = this.seed.h.max - this.seed.h.min;
			this.seed.h.b = this.seed.h.min;
			this.seed.h.e.k = (this.seed.h.e.max - this.seed.h.e.min)/2;
			this.seed.h.e.b = (this.seed.h.e.max + this.seed.h.e.min)/2;
			
			this.seed.d.k = (this.seed.d.max - this.seed.d.min)/2;
			this.seed.d.b = (this.seed.d.max + this.seed.d.min)/2;
			this.seed.d.e.k = (this.seed.d.e.max - this.seed.d.e.min)/2;
			this.seed.d.e.b = (this.seed.d.e.max + this.seed.d.e.min)/2;
			
			this.seed.tH.k = (this.seed.tH.max - this.seed.tH.min)/2;
			this.seed.tH.b = (this.seed.tH.max + this.seed.tH.min)/2;
			this.seed.tH.e.k = (this.seed.tH.e.max - this.seed.tH.e.min)/2;
			this.seed.tH.e.b = (this.seed.tH.e.max + this.seed.tH.e.min)/2;
			
			this.seed.oS.k = (this.seed.oS.max - this.seed.oS.min)/2;
			this.seed.oS.b = (this.seed.oS.max + this.seed.oS.min)/2;
			
			this.seed.lS.k = (this.seed.lS.max - this.seed.lS.min)/2;
			this.seed.lS.b = (this.seed.lS.max + this.seed.lS.min)/2;
			this.seed.lS.e.k = (this.seed.lS.e.max - this.seed.lS.e.min)/2;
			this.seed.lS.e.b = (this.seed.lS.e.max + this.seed.lS.e.min)/2;
			
			this.seed.wR.k = (this.seed.wR.max - this.seed.wR.min)/2;
			this.seed.wR.b = (this.seed.wR.max + this.seed.wR.min)/2;
			this.seed.wR.e.k = (this.seed.wR.e.max - this.seed.wR.e.min)/2;
			this.seed.wR.e.b = (this.seed.wR.e.max + this.seed.wR.e.min)/2;
		}
	}
	
	
	
	/*
	* 方块操作(add/delete)
	*/
	
	//获取方块（不可编辑）
	get(x, y, z){
		x=Math.round(x), y=Math.round(y), z=Math.round(z); //规范化
		
		return this.map[x] && this.map[x][y] && this.map[x][y][z];
		
		/*if (this.map[x] && this.map[x][y]){
			return this.map[x][y][z];
		}else{
			return undefined;
		}*/
		
		/*try{
			return this.map[x][y][z];
		}catch(err){ //超过范围
			return undefined;
		}*/
	}
	
	//设置方块
	set(x, y, z, value){
		x=Math.round(x), y=Math.round(y), z=Math.round(z); //规范化
		
		if (!this.map[x])
			this.map[x] = [];
		if (!this.map[x][y])
			this.map[x][y] = [];
		this.map[x][y][z] = value;
	}
	
	
	//添加方块
	add(block, {x,y,z}, type=true){
		// let {type=true} = opt;
		x=Math.round(x), y=Math.round(y), z=Math.round(z); //规范化
		
		// if (this.get(x, y, z) === undefined) return;
		if ( this.get(x, y, z) ){ //有方块
			if (type){ //强制替换
				for (const i of this.map[x][y][z].block.mesh.material)
					i.dispose();
				this.map[x][y][z].block.mesh.geometry.dispose(); //清除内存
				scene.remove( this.map[x][y][z].block.mesh );
				// this.map[x][y][z] = null;
				delete this.map[x][y][z];
				/*if (this.map[x][y].every(v => !v))
					delete this.map[x][y];
				if (this.map[x].every(v => !v))
					delete this.map[x];*/
			}else{ //不替换
				return;
			}
		}
		
		block.block.mesh.position.x = x*100;
		block.block.mesh.position.y = y*100;
		block.block.mesh.position.z = z*100;
		
		this.set(x, y, z, block);
		scene.add( block.block.mesh ); //网格模型添加到场景中
		block.block.addTo = true;
	}
	
	//根据 模板和ID 添加方块
	addID(id, {x,y,z}, template, opt={}){
		const {type=true, attr={}} = opt;
		/* if (typeof type != "boolean"){
			[type, attr] = [undefined, type];
		} */
		// if (!attr.block) attr.block = {};
		if (id == 0){ //添加空气
			x=Math.round(x), y=Math.round(y), z=Math.round(z); //规范化
			if ( this.get(x, y, z) ){ //有方块（强制移除）
				for (const i of this.map[x][y][z].block.mesh.material)
					i.dispose();
				this.map[x][y][z].block.mesh.geometry.dispose(); //清除内存
				scene.remove(this.map[x][y][z].block.mesh);
			}
			// this.map[x][y][z] = null; //空气
			this.set(x, y, z, null);
			/* if (this.map[x][y].every(v => !v))
				delete this.map[x][y];
			if (this.map[x].every(v => !v))
				delete this.map[x]; */
			
			return;
		}
		
		const block = new Block({
			id,
			attr
		}).makeMesh();
		this.add(
			block,
			{x, y, z},
			type
		); //以模板建立
	}
	
	//删除方块
	delete(x, y, z){
		x=Math.round(x), y=Math.round(y), z=Math.round(z); //规范化
		
		if (!this.get(x,y,z)) // 没有方块(null)/不在范围(undefined)/加载中(false)
			return;
		
		for (const i of this.map[x][y][z].block.mesh.material)
			i.dispose();
		this.map[x][y][z].block.mesh.geometry.dispose(); //清除内存
		
		scene.remove(this.map[x][y][z].block.mesh);
		
		delete this.map[x][y][z];
		if (this.map[x][y].every(v => !v))
			delete this.map[x][y];
		if (this.map[x].every(v => !v))
			delete this.map[x];
	}
	
	
	
	/*
	* 更新操作(update)
	*/
	
	//更新方块
	update(x, y, z){
		x=Math.round(x), y=Math.round(y), z=Math.round(z); //规范化
		let thisBlock = this.get(x,y,z);
		
		if (thisBlock === null) return; //空气
		
		const rule = [
				[1,0,0],
				[-1,0,0],
				[0,1,0],
				[0,-1,0],
				[0,0,1],
				[0,0,-1]
			],
			visibleValue = [], //可见值
			noTransparent = (thisBlock && thisBlock.attr && thisBlock.attr.block && thisBlock.attr.block.noTransparent!==undefined)? //有属性
				thisBlock.attr.block.noTransparent:
				TEMPLATES[ thisBlock?thisBlock.id:0 ].attr.block.noTransparent; //是否可以隐藏
		let needLoad = false; //需要加载
		
		if (noTransparent === true){ //整体不可隐藏
			for (let i=0; i<6; i++)
				visibleValue[i] = true;
			needLoad = true;
		}else{
			for (const [i, [dx,dy,dz]] of Object.entries(rule)){ //遍历四周的方块
				const px=x+dx, py=y+dy, pz=z+dz;
				let thatBlock = this.get(px, py, pz); //四周的方块
				
				if (thatBlock === undefined){ //未加载
					const cX = Math.round(px/map.size.x),
						cZ = Math.round(pz/map.size.z), //所属区块(Chunk)
						edit = this.chunks[cX] && this.chunks[cX][cZ] && this.chunks[cX][cZ].edit;
					thatBlock = this.perGet(px, py, pz, edit||[]); //应该的方块
				}
				
				if ( noTransparent && noTransparent[i] ){ //为数组 且 不可隐藏
					needLoad = true;
					visibleValue.push(true);
				}else if ( py < map.size[0].y ){ //最底层 则不显示
					visibleValue.push(false);
				}else if ( !(thatBlock && thatBlock.id) ){ //无方块 显示
					needLoad = true;
					visibleValue.push(true);
				}else if ( thatBlock.attr && thatBlock.attr.block && thatBlock.attr.block.transparent !== undefined ){ //有属性
					const visible = thatBlock.attr.block.transparent; //透明则可见
					needLoad = needLoad || visible;
					visibleValue.push( visible ); //方块透明 显示
				}else{ //继承模板
					const visible = TEMPLATES[ thatBlock.id ].attr.block.transparent;
					needLoad = needLoad || visible;
					visibleValue.push( visible ); //方块透明 显示
				}
			}
		}
		
		if (thisBlock === undefined){ //未加载
			const cX = Math.round(x/map.size.x),
				cZ = Math.round(z/map.size.z), //所属区块(Chunk)
				edit = this.chunks[cX] && this.chunks[cX][cZ] && this.chunks[cX][cZ].edit,
				get = new Block( this.perGet(x, y, z, edit||[]) ); //应该的方块
			
			if ( needLoad && this.getInitedChunks().some(v => v[0]==cX && v[1]==cZ) ){ //不可隐藏（有面true） 且 在加载区块内
				this.addID(get.id, {
					x,
					y,
					z,
				}, TEMPLATES, {
					attr: get.attr
				});
				thisBlock = this.get(x,y,z); //加载后的this方块
			}
			if ( !thisBlock ) //undefined（无需加载） 或 null（加载为空气）
				return;
		}
		
		const material = thisBlock.block.material;
		for (const i in material)
			material[i].visible = visibleValue[i];
		
		if (thisBlock.block.addTo == true && visibleValue.every(value => !value)){ //已加入 and 可隐藏（每面都false）
			scene.remove( thisBlock.block.mesh );
			thisBlock.block.addTo = false;
			// console.log("隐藏", this.map[x][y][z])
		}
		if (thisBlock.block.addTo == false && visibleValue.some(value => value)){ //未加入 and 不可隐藏（有面true）
			scene.add( thisBlock.block.mesh );
			thisBlock.block.addTo = true;
			// console.log("显示", this.map[x][y][z])
		}
		
		/* if (thisBlock === undefined){ //未加载
			const cX = Math.round(x/map.size.x),
				cZ = Math.round(z/map.size.z), //所属区块(Chunk)
				edit = this.chunks[cX] && this.chunks[cX][cZ] && this.chunks[cX][cZ].edit,
				get = new Block( this.perGet(x, y, z, edit||[]) ),
				noTransparent = get.id && get.get("attr", "block", "noTransparent");
			visibleValue = [
				!( this.get(x+1, y, z) && !this.get(x+1, y, z).get("attr", "block", "transparent")) || noTransparent,
				!( this.get(x-1, y, z) && !this.get(x-1, y, z).get("attr", "block", "transparent")) || noTransparent,
				!( this.get(x, y+1, z) && !this.get(x, y+1, z).get("attr", "block", "transparent")) || noTransparent,
				!( this.get(x, y-1, z) && !this.get(x, y-1, z).get("attr", "block", "transparent")) || noTransparent,
				!( this.get(x, y, z+1) && !this.get(x, y, z+1).get("attr", "block", "transparent")) || noTransparent,
				!( this.get(x, y, z-1) && !this.get(x, y, z-1).get("attr", "block", "transparent")) || noTransparent
				// 没有方块 或 有方块非透明 则显示  或  自身透明 也显示
			];
			
			if (visibleValue.some(v => v) && this.getInitedChunks().some(v => v[0]==cX && v[1]==cZ)){ //不可隐藏（有面true） 且 在加载区块内
				this.addID(get.id, {
					x,
					y,
					z,
				}, TEMPLATES, {
					attr: get.attr
				});
				thisBlock = this.get(x,y,z); //加载后的this方块
			}
			if (!thisBlock) //undefined（无需加载） 或 null（加载为空气）
				return;
		}else{ //已加载
			const noTransparent =  thisBlock.get("attr", "block", "noTransparent");
			visibleValue = [
				!( this.get(x+1, y, z) && !this.get(x+1, y, z).get("attr", "block", "transparent")) || noTransparent,
				!( this.get(x-1, y, z) && !this.get(x-1, y, z).get("attr", "block", "transparent")) || noTransparent,
				!( this.get(x, y+1, z) && !this.get(x, y+1, z).get("attr", "block", "transparent")) || noTransparent,
				!( this.get(x, y-1, z) && !this.get(x, y-1, z).get("attr", "block", "transparent")) || noTransparent,
				!( this.get(x, y, z+1) && !this.get(x, y, z+1).get("attr", "block", "transparent")) || noTransparent,
				!( this.get(x, y, z-1) && !this.get(x, y, z-1).get("attr", "block", "transparent")) || noTransparent
				// 没有方块 或 有方块非透明 则显示  或  自身透明 也显示
			];
		} */
		
		/*if (thisBlock === undefined){ //未加载
			let [cX, cZ] = [x/map.size.x, z/map.size.z].map(Math.round); //所属区块(Chunk)
			if (visibleValue.some(v => v) && this.getInitedChunks().some(v => v[0]==cX && v[1]==cZ)){ //不可隐藏（有面true） and 在加载区块内
				let edit = this.edit[cX] && this.edit[cX][cZ];
				let get = this.perGet(x, y, z, edit||[]);
				this.addID(get.id, {
					x,
					y,
					z,
				}, TEMPLATES, {
					attr: get.attr
				});
				thisBlock = this.get(x,y,z);
			}
			if (!thisBlock) //undefined（仍未加载） or null（加载为空气）
				return;
		}*/
		
		
		
		/* try{
			if (thisBlock === undefined && visibleValue.some(value => value)){ //未加载 且 不可隐藏（有面true）
				let edit = this.edit[Math.round(x/map.size.x)] && this.edit[Math.round(x/map.size.x)][Math.round(z/map.size.z)];
				let get = this.perGet(x, y, z, edit||[]);
				this.addID(get.id, {
					x,
					y,
					z,
				}, TEMPLATES, {
					attr: get.attr
				});
				console.log(this.get(x,y,z), thisBlock)
				thisBlock = this.get(x,y,z);
				if (thisBlock === null) //空气
					return;
			}
			console.log(this.get(x,y,z), thisBlock)
			let material = thisBlock.block.material;
			for (let i in material)
				material[i].visible = visibleValue[i];
			
			if (thisBlock.block.addTo == true && visibleValue.every(value => !value)){ //已加入 且 可隐藏（每面都false）
				scene.remove(thisBlock.block.mesh);
				thisBlock.block.addTo = false;
				// console.log("隐藏", this.map[x][y][z])
			}
			if (thisBlock.block.addTo == false && visibleValue.some(value => value)){ //未加入 且 不可隐藏（有面true）
				scene.add(thisBlock.block.mesh);
				thisBlockblock.addTo = true;
				// console.log("显示", this.map[x][y][z])
			}
		}catch(e){
			debugger
		} */
		
	}
	
	//更新方块及周围
	updateRound(x,y,z){
		this.update(x, y, z);
		this.update(x+1, y, z);
		this.update(x-1, y, z);
		this.update(x, y+1, z);
		this.update(x, y-1, z);
		this.update(x, y, z+1);
		this.update(x, y, z-1);
	}
	
	//更新列方块
	updateColumn(x, z){
		//console.log("updateColumn:",x,z,+time.getTime());
		for (let dy=this.size[0].y, y1 = this.size[1].y; dy<=y1; dy++)
			this.update(x, dy, z);
	}
	
	//更新区块内所有方块（同步）
	updateChunk(x, z){
		x = Math.round(x), z = Math.round(z); //规范化
		const ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		if ( !this.getLoadedChunks().some(v => v[0]==x && v[1]==z) ) //未加载完毕
			return console.warn("updateChunk", x, z, "haven't load");
		
		for (let dy=this.size[0].y; dy<=this.size[1].y; dy++)
			for (let dx=this.size[0].x; dx<=this.size[1].x; dx++)
				for (let dz=this.size[0].z; dz<=this.size[1].z; dz++)
					this.update(ox+dx, dy, oz+dz);
	}
	//更新区块内所有方块（异步）
	updateChunkAsync(x, z, opt={}){
		let {
				finishCallback,
				progressCallback,
				breakTime=66, // 最大执行时间/ms
				mostSpeed=2, // 最大速度/次
				breakPoint={}
			} = opt,
			{
				dx = this.size[0].x,
				dz = this.size[0].z
			} = breakPoint;
		
		x = Math.round(x), z = Math.round(z); //规范化
		const ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		if ( !this.getLoadedChunks().some(v => v[0]==x && v[1]==z) ) //未加载完毕
			return console.warn("updateChunkAsync", x, z, "haven't load");
		
		let t0 = new Date(),
			num = 0;
		
		for (let i=dx; i<=this.size[1].x; i++){
			for (let j=dz; j<=this.size[1].z; j++){
				
				for (let dy=this.size[0].y; dy<=this.size[1].y; dy++)
					this.update(ox+i, dy, oz+j);
				
				if (new Date()-t0 > breakTime) //超时
					return setTimeout(()=>{
						this.updateChunkAsync(x, z, {
							finishCallback,
							progressCallback,
							breakTime,
							breakPoint: {dx:i, dz:j+1}
						});
					},0);
				
			}
			dz = this.size[0].z;
			
			if (progressCallback)
				progressCallback( (i-this.size[0].x) / (this.size[1].x-this.size[0].x) );
			
			if (++num >= mostSpeed) //超数
				return setTimeout(()=>{
					this.updateChunkAsync(x, z, {
						finishCallback,
						progressCallback,
						breakTime,
						breakPoint: {dx:i+1}
					});
				},0);
		}
		
		if (finishCallback) finishCallback();
	}
	//更新区块内所有方块（生成器异步）
	updateChunkGenerator(x, z, opt={}){
		let {
			finishCallback,
			progressCallback,
			breakTime=66, // 最大执行时间/ms
			mostSpeed=2 // 最大速度/次
		} = opt;
		
		x = Math.round(x), z = Math.round(z); //规范化
		const ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		if ( !this.getLoadedChunks().some(v => v[0]==x && v[1]==z) ) //未加载完毕
			return console.warn("updateChunkGenerator", x, z, "haven't load");
		
		const gen = function* (_this){
			for (let i=_this.size[0].x; i<=_this.size[1].x; i++){
				for (let j=_this.size[0].z; j<=_this.size[1].z; j++){
					for (let k=_this.size[0].y; k<=_this.size[1].y; k++)
						_this.update(ox+i, k, oz+j);
					yield; //判断超时k
				}
				if (progressCallback)
					progressCallback( (i-_this.size[0].x) / (_this.size[1].x-_this.size[0].x) );
				yield true; //判断超数
			}
		}
		
		const gener = gen( this ),
			id = setInterval(function work(){
				let res = {},
					t0 = +new Date(),
					num = 0;
				while ( !res.done ){
					res = gener.next();
					if (new Date()-t0 >= breakTime) //超时
						return;
					if (res.value == true && ++num >= mostSpeed) //超数
						return;
				}
				if (finishCallback) finishCallback(); //更新完毕
				clearInterval(id); //运行结束
			}, 0);
		return id;
	}
	
	
	/*
	* 区块状态操作
	* status: {true:已加载, false:加载/卸载中, undefined:已卸载}
	*/
	
	//开始加载区块
	startLoadChunk(x, z, edit){
		x=Math.round(x), z=Math.round(z); //规范化
		const ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		console.log("start load chunk", x, z)
		
		if ( !this.chunks[x] )
			this.chunks[x] = [];
		if ( !this.chunks[x][z] )
			this.chunks[x][z] = {};
		
		this.chunks[x][z].status = false; //加载中
		this.chunks[x][z].edit = edit;
		this.chunks[x][z].weather = new Weather(
			[
				ox + this.size[0].x,
				oz + this.size[0].z
			],[
				ox + this.size[1].x,
				oz + this.size[1].z
			],
			sNoise.weatherRain( this.seed.noise, this.seed.wR, x*this.size.x, z*this.size.z, time.getTime() )
		);
		console.log("weather:", sNoise.weatherRain( this.seed.noise, this.seed.wR, x*this.size.x, z*this.size.z, time.getTime()/1000/60 ))
		time.setInterval((speed)=>{
			if (!speed) return;
			if ( !this.chunks[x][z].weather ) return;
			console.log("weather:", sNoise.weatherRain( this.seed.noise, this.seed.wR, x*this.size.x, z*this.size.z, time.getTime()/1000/3600 ))
			this.chunks[x][z].weather.rain =
				sNoise.weatherRain( this.seed.noise, this.seed.wR, x*this.size.x, z*this.size.z, time.getTime()/1000/3600 );
		}, 60*1000); //60s更新一次
	}
	//完成加载区块
	finishLoadChunk(x, z){
		x=Math.round(x), z=Math.round(z); //规范化
		
		console.log("finish load chunk", x, z)
		
		if ( !this.chunks[x] )
			this.chunks[x] = [];
		if ( !this.chunks[x][z] )
			this.chunks[x][z] = {};
		
		this.chunks[x][z].status = true; //加载完毕
		if (this.chunks[x][z].weather)
			this.chunks[x][z].weather.start_rain(); //开始下雨
	}
	//开始卸载区块
	startUnloadChunk(x, z){
		x=Math.round(x), z=Math.round(z); //规范化
		
		console.log("start unload chunk", x, z)
		
		if ( !this.chunks[x] )
			this.chunks[x] = [];
		if ( !this.chunks[x][z] )
			this.chunks[x][z] = {};
		
		this.chunks[x][z].status = false; //卸载中
	}
	//完成卸载区块
	finishUnloadChunk(x, z){
		x=Math.round(x), z=Math.round(z); //规范化
		
		console.log("finish unload chunk", x, z)
		
		if ( !this.chunks[x] )
			this.chunks[x] = [];
		if ( !this.chunks[x][z] )
			this.chunks[x][z] = {};
		
		if (this.chunks[x][z].weather)
			this.chunks[x][z].weather.clear_rain();
		
		delete this.chunks[x][z].weather;
		delete this.chunks[x][z].status; //已卸载
	}
	
	//获取已初始化的区块(status:true/false)
	getInitedChunks(x, z){
		x=Math.round(x), z=Math.round(z); //规范化
		
		const arr = [];
		for (const i in this.chunks)			
			for (const j in this.chunks[i])
				if ( this.chunks[i][j].status !== undefined ) // true或false
					arr.push([i, j])
		
		return arr;
	}
	//获取已加载的区块(status:true)
	getLoadedChunks(x, z){
		x=Math.round(x), z=Math.round(z); //规范化
		
		const arr = [];
		for (const i in this.chunks)			
			for (const j in this.chunks[i])
				if ( this.chunks[i][j].status === true )
					arr.push([i, j])
		
		return arr;
	}
	
	
	
	/*
	* 区块操作
	*/
	
	//获取方块信息
	perGet(x, y, z, edit){
		// x=Math.round(x), y=Math.round(y), z=Math.round(z); //规范化
		// console.warn("load", x, z)
		
		for (let i=edit.length-1; i>=0; i--){
			const value = edit[i];
			if (
				value.x == x &&
				value.y == y &&
				value.z == z
			){ //被编辑
				return {
					id: value.id,
					attr: value.attr
				};
			}
		} //未编辑
		
		let height = sNoise.height(this.seed.noise, this.seed.h, x, z);
		height = Math.max( this.size[0].y, Math.min(height, this.size[1].y) );
		/*if (height < this.size[0].y){
			height = this.size[0].y;
		}else if (height > this.size[1].y){
			height = this.size[1].y;
		}*/
		/* let sNoise = ( t.noise.more3D(0.6, x/t.h.q, z/t.h.q, 3)+
		t.noise.more3D(-3.1415926, x/t.h.q, z/t.h.q, 3)+
		t.noise.more3D(54.782, x/t.h.q, z/t.h.q, 3) )/3;
		noise = 1-Math.sin( (1-noise)*90/180*Math.PI );
		let height = noise *t.h.k +t.h.b+
		t.noise.more3D(-1428.57, x/t.h.e.q, z/t.h.e.q, 3) *t.h.e.k +t.h.e.b; */
		
		/*let noise = Math.abs(t.noise.more3D(0.6, x/t.h.q/2, z/t.h.q/2, 5));
		let height = noise*noise*noise*(noise*(noise*6-15)+10) //*t.h.k +t.h.b;
		height = Math.pow(t.h.k, height) + t.h.b;*/
		// debugger
		// let a = 1/(1+Math.pow(Math.E, 3)), // 1/(1+e^3)
		// 	b = 1/(1+Math.pow(Math.E, -3)), // 1/(1+e^(-3))
		// 	noise = (1+Math.pow(Math.E, -3*noise)-a)/(b-a); // (1+e^(-3x)-a)/(b-a)
		// let height = (t.h.max -t.h.min)/(t.h.ave -1) *Math.pow(t.h.ave, noise) *(t.h.min *t.h.ave -t.h.max)/(t.h.ave -1);
		// let height = Math.pow(1000, 0.5+0.5*noise, 3), 10);
		// let height = t.noise.noise3D(0.6, x/t.h.q, z/t.h.q) *t.h.de + t.h.ave;
		
		// let grass = false;
		let type = sNoise.type(this.seed.noise, this.seed.t, x, z),
		// 90%+ 高原（草木不生，积雪覆盖）
		// 70%+ 高山（无树，有草）
		// 26+ 丘陵（树）
			//treeTop = null, //保留最高树干坐标
			earth = height - height * sNoise.dirt(this.seed.noise, this.seed.d, x, z),
			treeHeight = height + sNoise.treeHeight(this.seed.noise, this.seed.tH, x, z),
			leaves = [+Infinity, -Infinity]; //(min, max]
		
		for ( const [dx,dz] of [[1,0], [-1,0], [0,1],[0,-1]] ){
			const tH = sNoise.treeHeight(this.seed.noise, this.seed.tH, x+dx, z+dz);
			if ( tH &&
				!sNoise.type(this.seed.noise, this.seed.t, x+dx, z+dz) &&
				!sNoise.openStone(this.seed.noise, this.seed.oS, x, z)
			){ //有树 且 为森林 且 无石头
				let lH = tH * sNoise.leavesScale(this.seed.noise, this.seed.lS, x+dz, z+dz), //叶高
					h = sNoise.height(this.seed.noise, this.seed.h, x+dx, z+dz); //底面高度
				h = Math.max( this.size[0].y, Math.min(h, this.size[1].y) );
				leaves[1] = Math.max(leaves[1], h+tH);
				leaves[0] = Math.min(leaves[0], h+tH-lH);
				// console.log(`h:${h}, treeH:${tH}, leavesH:${lH}`, leaves)
			}
		}
		
		/* let earth = height - height * (t.noise.more3D(6.6, x/t.s.q, z/t.s.q, 6) *t.s.k +t.s.b)+
		t.noise.more3D(-52.6338, x/t.s.e.q, z/t.s.e.q, 3) *t.s.e.k +t.s.e.b; */
		let id = 0;
		switch (type){
			case 0: //森林
				
				/* if (height > 0.9*this.size[1].y){ // 90%+ 高原（草木不生，积雪覆盖）
					grass = true;
				}else */if (height > 0.7*this.size[1].y){ // 70%+ 高山（无树，有草）
					treeHeight = height;
				}
				if (sNoise.openStone(this.seed.noise, this.seed.oS, x, z)) //石头上不长树
					treeHeight = height;
				
				if (y > treeHeight+1){
					if (y <= leaves[1] && y > leaves[0]){
						id = 8; //树叶
					}else{
						id = 0; // 空气/真空 (null)
					}
				}else if (y > treeHeight){
					if ( treeHeight != height ||
						(y <= leaves[1] && y > leaves[0])
					){ //有树或旁边有树
						id = 8; //树叶
					}else{
						id = 0; // 空气/真空 (null)
					}
				}else if (y > height){
					//if (!treeTop) treeTop = y;
					id = 7.1; //橡木
				}else if (y == Math.floor(height) && !(height > 0.9*this.size[1].y)){ // 90%+ 高原（草木不生，积雪覆盖）
					if (sNoise.openStone(this.seed.noise, this.seed.oS, x, z)){
						id = 5; //石头
					}else{
						id = 2; //草方块
					}
				}else if (y > earth){
					// if (grass){
						id = 3; //泥土
					/* }else{
						id = 2; //草方块
						// grass = true;
					} */
				}/*else if (y == 0){
					id = 2; //基岩
				}*/else{
					/* if (!grass && !sNoise.openStone(this.seed.noise, this.seed.oS, x, z)){
						id = 2; //草方块
						grass = true;
					}else{ */
						id = 5; //石头
					// }
				}
				break;
				
			case 1: //草原
				
				/* if (height > 0.9*this.size[1].y){ // 90%+ 高原（草木不生，积雪覆盖）
					grass = true;
				} */
				
				if (y > height){
					if (y <= leaves[1] && y > leaves[0]){
						id = 8; //树叶
					}else{
						id = 0; // 空气/真空 (null)
					}
				}/* else if (y > height){
					//if (!treeTop) treeTop = y;
					id = 7.1; //橡木
				} */else if (y == Math.floor(height) && !(height > 0.9*this.size[1].y)){ // 90%+ 高原（草木不生，积雪覆盖）
					if (sNoise.openStone(this.seed.noise, this.seed.oS, x, z)){
						id = 5; //石头
					}else{
						id = 2; //草方块
					}
				}else if (y > earth){
					// if (grass){
						id = 3; //泥土
					/* }else{
						id = 2; //草方块
						// grass = true;
					} */
				}else{
					/* if (!grass && !sNoise.openStone(this.seed.noise, this.seed.oS, x, z)){
						id = 2; //草方块
						// grass = true;
					}else{ */
						id = 5; //石头
					// }
				}
				break;
				
			case 2: //沙漠
				
				if (y > height){
					if (y <= leaves[1] && y > leaves[0]){
						id = 8; //树叶
					}else{
						id = 0; // 空气/真空 (null)
					}
				}else if (y > earth){
					id = 6; //沙子
				}else{
					/* if (!grass && !sNoise.openStone(this.seed.noise, this.seed.oS, x, z)){
						id = 6; //沙子
						grass = true;
					}else{ */
						id = 5; //石头
					// }
				}
				break;
			
			default:
				id = 0;
		}
		
		return {id};
	}
	
	//获取一列方块信息
	perGetColumn(x, z, edit){
		// [x, z] = [Math.round(x), Math.round(z)]; //规范化
		// console.warn("load", x, z)
		
		let column = [],
			height = sNoise.height(this.seed.noise, this.seed.h, x, z);
		height = Math.max( this.size[0].y, Math.min(height, this.size[1].y) );
		/*if (height < this.size[0].y){
			height = this.size[0].y;
		}else if (height > this.size[1].y){
			height = this.size[1].y;
		}*/
		/* let sNoise = ( t.noise.more3D(0.6, x/t.h.q, z/t.h.q, 3)+
		t.noise.more3D(-3.1415926, x/t.h.q, z/t.h.q, 3)+
		t.noise.more3D(54.782, x/t.h.q, z/t.h.q, 3) )/3;
		noise = 1-Math.sin( (1-noise)*90/180*Math.PI );
		let height = noise *t.h.k +t.h.b+
		t.noise.more3D(-1428.57, x/t.h.e.q, z/t.h.e.q, 3) *t.h.e.k +t.h.e.b; */
		
		/*let noise = Math.abs(t.noise.more3D(0.6, x/t.h.q/2, z/t.h.q/2, 5));
		let height = noise*noise*noise*(noise*(noise*6-15)+10) //*t.h.k +t.h.b;
		height = Math.pow(t.h.k, height) + t.h.b;*/
		// debugger
		// let a = 1/(1+Math.pow(Math.E, 3)), // 1/(1+e^3)
		// 	b = 1/(1+Math.pow(Math.E, -3)), // 1/(1+e^(-3))
		// 	noise = (1+Math.pow(Math.E, -3*noise)-a)/(b-a); // (1+e^(-3x)-a)/(b-a)
		// let height = (t.h.max -t.h.min)/(t.h.ave -1) *Math.pow(t.h.ave, noise) *(t.h.min *t.h.ave -t.h.max)/(t.h.ave -1);
		// let height = Math.pow(1000, 0.5+0.5*noise, 3), 10);
		// let height = t.noise.noise3D(0.6, x/t.h.q, z/t.h.q) *t.h.de + t.h.ave;
		
		// let grass = false;
		let type = sNoise.type(this.seed.noise, this.seed.t, x, z),
				// 90%+ 高原（草木不生，积雪覆盖）
				// 70%+ 高山（无树，有草）
				// 26+ 丘陵（树）
			//treeTop = null, //保留最高树干坐标
			earth = height - height * sNoise.dirt(this.seed.noise, this.seed.d, x, z),
			treeHeight = height + sNoise.treeHeight(this.seed.noise, this.seed.tH, x, z),
			leaves = [+Infinity, -Infinity]; //(min, max]
		
		for ( const [dx,dz] of [[1,0], [-1,0], [0,1],[0,-1]] ){
			const tH = sNoise.treeHeight(this.seed.noise, this.seed.tH, x+dx, z+dz);
			if ( tH &&
				!sNoise.type(this.seed.noise, this.seed.t, x+dx, z+dz) &&
				!sNoise.openStone(this.seed.noise, this.seed.oS, x+dx, z+dz)
			){ //有树 且 为森林 且 无石头
				let lH = tH * sNoise.leavesScale(this.seed.noise, this.seed.lS, x+dz, z+dz), //叶高
					h = sNoise.height(this.seed.noise, this.seed.h, x+dx, z+dz); //底面高度
				h = Math.max( this.size[0].y, Math.min(h, this.size[1].y) );
				leaves[1] = Math.max(leaves[1], h+tH);
				leaves[0] = Math.min(leaves[0], h+tH-lH);
				// console.log(`h:${h}, treeH:${tH}, leavesH:${lH}`, leaves)
			}
		}
		
		for (let dy=this.size[1].y; dy>=this.size[0].y; dy--){ //注意：从上到下
			
			if (edit.some((value)=>{
				if (
					value.x == x &&
					value.y == dy &&
					value.z == z
				){ //被编辑
					column[dy] = {
						id: value.id,
						attr: value.attr
					};
					return true; //让下面continue
				}
			})) continue; //被编辑 跳过
			//未编辑
			
			/* let earth = height - height * (t.noise.more3D(6.6, x/t.s.q, z/t.s.q, 6) *t.s.k +t.s.b)+
			t.noise.more3D(-52.6338, x/t.s.e.q, z/t.s.e.q, 3) *t.s.e.k +t.s.e.b; */
			let id = 0;
			switch (type){
				case 0: //森林
					
					/* if (height > 0.9*this.size[1].y){ // 90%+ 高原（草木不生，积雪覆盖）
						grass = true;
					}else */if (height > 0.7*this.size[1].y){ // 70%+ 高山（无树，有草）
						treeHeight = height;
					}
					if (sNoise.openStone(this.seed.noise, this.seed.oS, x, z)) //石头上不长树
						treeHeight = height;
					
					if (dy > treeHeight+1){
						if (dy <= leaves[1] && dy > leaves[0]){
							id = 8; //树叶
						}else{
							id = 0; // 空气/真空 (null)
						}
					}else if (dy > treeHeight){
						if ( treeHeight != height ||
							(dy <= leaves[1] && dy > leaves[0])
						){ //有树或旁边有树
							id = 8; //树叶
						}else{
							id = 0; // 空气/真空 (null)
						}
					}else if (dy > height){
						//if (!treeTop) treeTop = y;
						id = 7.1; //橡木
					}else if (dy == Math.floor(height) && !(height > 0.9*this.size[1].y)){ // 90%+ 高原（草木不生，积雪覆盖）
						if (sNoise.openStone(this.seed.noise, this.seed.oS, x, z)){
							id = 5; //石头
						}else{
							id = 2; //草方块
						}
					}else if (dy > earth){
						// if (grass){
							id = 3; //泥土
						/* }else{
							id = 2; //草方块
							// grass = true;
						} */
					}else{
						/* if (!grass && !sNoise.openStone(this.seed.noise, this.seed.oS, x, z)){
							id = 2; //草方块
							grass = true;
						}else{ */
							id = 5; //石头
						// }
					}
					break;
					
				case 1: //草原
					
					/* if (height > 0.9*this.size[1].y){ // 90%+ 高原（草木不生，积雪覆盖）
						grass = true;
					} */
					
					if (dy > height){
						if (dy <= leaves[1] && dy > leaves[0]){
							id = 8; //树叶
						}else{
							id = 0; // 空气/真空 (null)
						}
					}/* else if (dy > height){
						//if (!treeTop) treeTop = dy;
						id = 7.1; //橡木
					} */else if (dy == Math.floor(height) && !(height > 0.9*this.size[1].y)){ // 90%+ 高原（草木不生，积雪覆盖）
						if (sNoise.openStone(this.seed.noise, this.seed.oS, x, z)){
							id = 5; //石头
						}else{
							id = 2; //草方块
						}
					}else if (dy > earth){
						// if (grass){
							id = 3; //泥土
						/* }else{
							id = 2; //草方块
							// grass = true;
						} */
					}else{
						/* if (!grass && !sNoise.openStone(this.seed.noise, this.seed.oS, x, z)){
							id = 2; //草方块
							// grass = true;
						}else{ */
							id = 5; //石头
						// }
					}
					break;
					
				case 2: //沙漠
					
					if (dy > height){
						if (dy <= leaves[1] && dy > leaves[0]){
							id = 8; //树叶
						}else{
							id = 0; // 空气/真空 (null)
						}
					}else if (dy > earth){
						id = 6; //沙子
						//grass = true;
					}else{
						/*if (!grass && !sNoise.openStone(this.seed.noise, this.seed.oS, x, z)){
							id = 6; //沙子
							grass = true;
						}else{*/
							id = 5; //石头
						//}
					}
					break;
				
				default:
					id = 0;
			}
			
			column[dy] = { id };
		}
		
		return column;
	}
	/*perGetColumn_worker(x, z, edit, finishCallback){
		let worker = new Worker("./perGetColumn_worker.js");
		worker.postMessage({x, z, edit, t:this.seed});
		worker.onmessage = function (event) {
			console.log("Received message from", "perGetColumn_worker.js", event.data);
			finishCallback(event.data);
		}
	}*/
	
	//获取区块信息
	perGetChunk(x, z, edit){
		x = Math.round(x), z = Math.round(z); //规范化
		const ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		const result = [];
		for (let dx=this.size[0].x; dx<=this.size[1].x; dx++){
			result[dx] = [];
			for (let dz=this.size[0].z; dz<=this.size[1].z; dz++){
				result[dx][dz] = this.perGetColumn(ox+dx, oz+dz, edit);
				/* for (const y in result[dx][dz])
					result[dx][dz][y] = new Block(result[dx][dz][y]); */
			}
		}
		return result;
	}
	
	
	//加载列
	loadColumn(x, z, columns){
		x = Math.round(x), z = Math.round(z); //规范化
		const ox = Math.round(x/map.size.x)*map.size.x,
			oz = Math.round(z/map.size.z)*map.size.z,
			dx = x-ox,
			dz = z-oz,
			rule = [
				[1,0,0],
				[-1,0,0],
				[0,1,0],
				[0,-1,0],
				[0,0,1],
				[0,0,-1]
			];
		
		for (let y=this.size[0].y; y<=this.size[1].y; y++){
			const block = columns[dx][dz][y];
			if ( block.id ){ //有方块
				
				const visibleValue = [],
					noTransparent = (block.attr && block.attr.block && block.attr.block.noTransparent!==undefined)? //有属性
						block.attr.block.noTransparent:
						TEMPLATES[ block.id ].attr.block.noTransparent; //是否可以隐藏
				let needLoad = false;
				
				if (noTransparent === true){ //整体不可隐藏
					for (let i=0; i<6; i++)
						visibleValue[i] = true;
					needLoad = true;
				}else{
					for (const [i, [ddx,ddy,ddz]] of Object.entries(rule)){
						const px=dx+ddx, py=y+ddy, pz=dz+ddz;
						
						if ( noTransparent && noTransparent[i] ){ //为数组 且 不可隐藏
							needLoad = true;
							visibleValue.push(true);
						}else if ( py < map.size[0].y ){ //位于最底层 则不显示
							visibleValue.push(false);
						}/* else if (
							px < map.size[0].x || px > map.size[1].x ||
							py < map.size[0].y || py > map.size[1].y ||
							pz < map.size[0].z || pz > map.size[1].z
						){ //位于边缘 则不显示
							visibleValue.push(false);
						} */else if ( !(columns[px] && columns[px][pz] && columns[px][pz][py] && columns[px][pz][py].id) ){ //无方块 显示
							needLoad = true;
							visibleValue.push(true);
						}else if ( columns[px][pz][py].attr && columns[px][pz][py].attr.block ){ //有属性
							const visible = columns[px][pz][py].attr.block.transparent;
							needLoad = needLoad || visible;
							visibleValue.push( visible ); //方块透明 显示
						}else{ //继承模板
							const visible = TEMPLATES[ columns[px][pz][py].id ].attr.block.transparent;
							needLoad = needLoad || visible;
							visibleValue.push( visible ); //方块透明 显示
						}
					}
				}
				
				if ( needLoad ){ //有面需显示
					// if (y == 0) console.log(visibleValue)
					const thisBlock = new Block( block ).makeMesh(),
						material = thisBlock.block.material;
					
					if ( !thisBlock.get("attr", "block", "noTransparent") ) //允许透明
						for (let i=material.length-1; i>=0; i--)
							material[i].visible = visibleValue[i];
					
					this.add(
						thisBlock,
						{x, y, z}
					);
					
					// x,z,y
					/*const noTransparent =  thisBlock.get("attr", "block", "noTransparent"),
						visibleValue = [
							!( columns[dx+1] && columns[dx+1][y] && columns[dx+1][y][dz] && columns[dx+1][y][dz].id && !((columns[dx+1][y][dz].attr&&columns[dx+1][y][dz].attr.block.transparent)||TEMPLATES[columns[dx+1][y][dz].id].attr.block.transparent)) || noTransparent,
							!( columns[dx-1] && columns[dx-1][y] && columns[dx-1][y][dz] && columns[dx-1][y][dz].id && !((columns[dx-1][y][dz].attr&&columns[dx-1][y][dz].attr.block.transparent)||TEMPLATES[columns[dx-1][y][dz].id].attr.block.transparent)) || noTransparent,
							!( columns[dx] && columns[dx][y+1] && columns[dx][y+1][dz] && columns[dx][y+1][dz].id && !((columns[dx][y+1][dz].attr&&columns[dx][y+1][dz].attr.block.transparent)||TEMPLATES[columns[dx][y+1][dz].id].attr.block.transparent)) || noTransparent,
							!( columns[dx] && columns[dx][y-1] &&  columns[dx][y-1][dz] && columns[dx][y-1][dz].id && !((columns[dx][y-1][dz].attr&&columns[dx][y-1][dz].attr.block.transparent)||TEMPLATES[columns[dx][y-1][dz].id].attr.block.transparent)) || noTransparent,
							!( columns[dx] && columns[dx][y] && columns[dx][y][dz+1] && columns[dx][y][dz+1].id && !((columns[dx][y][dz+1].attr&&columns[dx][y][dz+1].attr.block.transparent)||TEMPLATES[columns[dx][y][dz+1].id].attr.block.transparent)) || noTransparent,
							!( columns[dx] && columns[dx][y] && columns[dx][y][dz-1] && columns[dx][y][dz-1].id && !((columns[dx][y][dz-1].attr&&columns[dx][y][dz-1].attr.block.transparent)||TEMPLATES[columns[dx][y][dz-1].id].attr.block.transparent)) || noTransparent
							// 没有方块 或 有方块非透明 则显示  或  自身透明 也显示
						],*/
					
				}
				
			}else{ //空气
				this.addID(0, {
					x,
					y,
					z
				}, TEMPLATES);
			}
		}
	}
	
	//加载区块（同步）
	loadChunk(x, z){
		x = Math.round(x), z = Math.round(z); //规范化
		const ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		if ( this.getInitedChunks().some(v => v[0]==x && v[1]==z) ) //已初始化
			return console.warn("loadChunk", x, z, "already inited");
		
		const edit = [];
		db.readStep(TABLE.WORLD, {
			index: "type",
			range: ["only", 0],
			stepCallback: (res)=>{
				if (
					res.x >= ox+this.size[0].x && res.x <= ox+this.size[1].x &&
					res.z >= oz+this.size[0].z && res.z <= oz+this.size[1].z
				) edit.push(res);
			},
			successCallback: ()=>{
				console.log("edit(DB):", x, z, edit);
				this.startLoadChunk(x, z, edit); //初始化区块
				
				const columns = this.perGetChunk(x, z, edit);
				for (let dx=this.size[0].x; dx<=this.size[1].x; dx++)
					for (let dz=this.size[0].z; dz<=this.size[1].z; dz++)
						for (let dz=this.size[0].z; dz<=this.size[1].z; dz++)
							this.loadColumn(ox+dx, oz+dz, columns);
				
				this.finishLoadChunk(x, z); //区块加载完毕
			},
		});
		/* const edit = DB.readChunk(x, z).then((edit)=>{
			this.startLoadChunk(x, z); //初始化区块
			
			console.log("edit(DB):", edit);
			//保存edit
			this.chunks[x][z].edit = edit;
			
			const columns = this.perGetChunk(x, z, edit);
			
			for (let dx=this.size[0].x; dx<=this.size[1].x; dx++)
				for (let dz=this.size[0].z; dz<=this.size[1].z; dz++)
					for (let dz=this.size[0].z; dz<=this.size[1].z; dz++)
						this.loadColumn(ox+dx, oz+dz, columns);
			
			this.finishLoadChunk(x, z); //区块加载完毕
			
		}); */
	}
	//加载区块（异步）
	loadChunkAsync(x, z, opt={}){
		let {
				finishCallback,
				progressCallback,
				breakTime=66, // 最大执行时间/ms
				mostSpeed=2, // 最大速度/次
				dir="", //方向
				breakPoint={}
			} = opt,
			{
				dx = dir=="x-"? this.size[1].x: this.size[0].x,
				dz = dir=="z-"? this.size[1].z: this.size[0].z
			} = breakPoint;
		
		x=Math.round(x), z=Math.round(z); //规范化
		const ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		if ( this.getInitedChunks().some(v => v[0]==x && v[1]==z) && !Object.keys(breakPoint).length ) //已初始化 且 非断点
			return console.warn("loadChunkAsync", x, z, "already inited");;
		
		//回调
		const func = (columns)=>{
			
			switch ( dir.substr(0,2) ){
				case "x-":
					{
						let t0 = +new Date(),
							num = 0;
						
						/*let dx;
						if (breakPoint){
							dx = breakPoint.dx==undefined? this.size[1].x: breakPoint.dx;
							delete breakPoint.dx;
						}else{
							dx = this.size[1].x;
						}*/
						for (let i=dx; i>=this.size[0].x; i--){
							
							/*let dz;
							if (breakPoint){
								dz = breakPoint.dz==undefined? this.size[0].z: breakPoint.dz;
								delete breakPoint.dz;
							}else{
								dz = this.size[0].z;
							}*/
							for (let j=dz; j<=this.size[1].z; j++){
								this.loadColumn(ox+i, oz+j, columns);
								if (new Date()-t0 > breakTime) //超时
									return setTimeout(()=>
										this.loadChunkAsync(x, z, {
											finishCallback,
											progressCallback,
											breakTime,
											mostSpeed,
											dir,
											breakPoint: {dx:i, dz:j+1, columns},
										}), 0);
							}
							dz = this.size[0].z;
							
							/*setTimeout(()=>{ //更新
								this.updateColumn(ox+dx, oz+this.size[0].z-1);
								this.updateColumn(ox+dx, oz+this.size[1].z+1);
								for (let dz=this.size[0].z; dz<=this.size[1].z; dz++)
									this.updateColumn(ox+dx+1, dz);
							}, 0);*/
							if (progressCallback)
								progressCallback( (i-this.size[1].x)/(this.size[0].x-this.size[1].x) );
							
							if (++num >= mostSpeed) //超数
								return setTimeout(()=>
									this.loadChunkAsync(x, z, {
										finishCallback,
										progressCallback,
										breakTime,
										mostSpeed,
										dir,
										breakPoint: {dx:i-1, columns}
									}), 0);
						}
						/*setTimeout(()=>{ //更新
							for (let dz=this.size[0].z; dz<=this.size[1].z; dz++){
								this.updateColumn(ox+this.size[0].x, oz+dz);
								this.updateColumn(ox+this.size[0].x-1, oz+dz);
							}
						},0);*/
						
						
						this.finishLoadChunk(x, z); //区块加载完毕
						
						if (finishCallback) finishCallback();
						
						/* let dx = this.size[1].x;
						let loadChunk_id = setInterval(()=>{
							if (dx < this.size[0].x){
								setTimeout(()=>{
									for (let dz=this.size[0].z; dz<=this.size[1].z; dz++){
										this.updateColumn(ox+dx+1, oz+dz);
										this.updateColumn(ox+dx, oz+dz);
									}
								},0);
								clearInterval(loadChunk_id);
								
								if (finishCallback)
									finishCallback();
								return;
							}
							
							//正常代码
							
							
							dx--;
						},0); */
						break;
					}
				
				case "z+":
					{
						let t0 = +new Date(),
							num = 0;
						
						/*let dz;
						if (breakPoint){
							dz = breakPoint.dz==undefined? this.size[0].z: breakPoint.dz;
							delete breakPoint.dz;
						}else{
							dz = this.size[0].z;
						}*/
						for (let j=dz; j<=this.size[1].z; j++){
							
							/*let dx;
							if (breakPoint){
								dx = breakPoint.dx==undefined? this.size[0].x: breakPoint.dx;
								delete breakPoint.dx;
							}else{
								dx = this.size[0].x;
							}*/
							for (let i=dx; i<=this.size[1].x; i++){
								this.loadColumn(ox+i, oz+j, columns);
								
								if (new Date()-t0 > breakTime) //超时
									return setTimeout(()=>
										this.loadChunkAsync(x, z, {
											finishCallback,
											progressCallback,
											breakTime,
											mostSpeed,
											dir,
											breakPoint: {dx:i+1, dz:j, columns},
										}), 0);
							}
							dx = this.size[0].x;
							
							/*setTimeout(()=>{ //更新
								this.updateColumn(ox+this.size[0].x-1, oz+dz);
								this.updateColumn(ox+this.size[1].x+1, oz+dz);
								for (let dx=this.size[0].x; dx<=this.size[1].x; dx++)
									this.updateColumn(dx, oz+dz-1);
							}, 0);*/
							if (progressCallback)
								progressCallback( (j-this.size[0].z)/(this.size[0].z-this.size[1].z) );
							
							if (++num >= mostSpeed) //超数
								return setTimeout(()=>
									this.loadChunkAsync(x, z, {
										finishCallback,
										progressCallback,
										breakTime,
										mostSpeed,
										dir,
										breakPoint: {dz:j+1, columns}
									}), 0);
						}
						/*setTimeout(()=>{ //更新
							for (let dx=this.size[0].x; dx<=this.size[1].x; dx++){
								this.updateColumn(ox+dx, oz+this.size[1].z);
								this.updateColumn(ox+dx, oz+this.size[1].z+1);
							}
						
						},0);*/
						
						this.finishLoadChunk(x, z); //区块加载完毕
						
						if (finishCallback) finishCallback();
						
						/* let dz = this.size[0].z;
						let loadChunk_id = setInterval(()=>{
							if (dz > this.size[1].z){
								setTimeout(()=>{
									for (let dx=this.size[0].x; dx<=this.size[1].x; dx++){
										this.updateColumn(ox+dx, oz+dz-1);
										this.updateColumn(ox+dx, oz+dz);
									}
								},0);
								clearInterval(loadChunk_id);
								
								if (finishCallback)
									finishCallback();
								return;
							}
							
							//正常代码
							for (let dx=this.size[0].x; dx<=this.size[1].x; dx++)
								this.loadColumn(ox+dx, oz+dz, columns);
							
							setTimeout(()=>{
								this.updateColumn(ox+this.size[0].x-1, oz+dz);
								this.updateColumn(ox+this.size[1].x+1, oz+dz);
								for (let dx=this.size[0].x; dx<=this.size[1].x; dx++)
									this.updateColumn(dx, oz+dz-1);
							}, 0);
							
							dz++;
						},0); */
						break;
					}
				
				case "z-":
					{
						let t0 = +new Date(),
							num = 0;
						
						/*let dz;
						if (breakPoint){
							dz = breakPoint.dz==undefined? this.size[1].z: breakPoint.dz;
							delete breakPoint.dz;
						}else{
							dz = this.size[1].z;
						}*/
						for (let j=dz; j>=this.size[0].z; j--){
							
							/*let dx;
							if (breakPoint){
								dx = breakPoint.dx==undefined? this.size[0].x: breakPoint.dx;
								delete breakPoint.dx;
							}else{
								dx = this.size[0].x;
							}*/
							for (let i=dx; i<=this.size[1].x; i++){
								this.loadColumn(ox+i, oz+j, columns);
								
								if (new Date()-t0 > breakTime) //超时
									return setTimeout(()=>
										this.loadChunkAsync(x, z, {
											finishCallback,
											progressCallback,
											breakTime,
											mostSpeed,
											dir,
											breakPoint: {dx:i+1, dz:j, columns},
										}), 0);
							}
							dx = this.size[0].x;
							
							/*setTimeout(()=>{ //更新
								this.updateColumn(ox+this.size[0].x-1, oz+dz);
								this.updateColumn(ox+this.size[1].x+1, oz+dz);
								for (let dx=this.size[0].x; dx<=this.size[1].x; dx++)
									this.updateColumn(dx, oz+dz-1);
							}, 0);*/
							if (progressCallback)
								progressCallback( (j-this.size[1].dz)/(this.size[0].z-this.size[1].z) );
							
							if (++num >= mostSpeed) //超数
								return setTimeout(()=>
									this.loadChunkAsync(x, z, {
										finishCallback,
										progressCallback,
										breakTime,
										mostSpeed,
										dir,
										breakPoint: {dz:j-1, columns}
									}), 0);
						}
						/*setTimeout(()=>{ //更新
							for (let dx=this.size[0].x; dx<=this.size[1].x; dx++){
								this.updateColumn(ox+dx, oz+this.size[1].z);
								this.updateColumn(ox+dx, oz+this.size[1].z+1);
							}
						
						},0);*/
						
						this.finishLoadChunk(x, z); //区块加载完毕
						
						if (finishCallback) finishCallback();
						
						/* let dz = this.size[1].z;
						let loadChunk_id = setInterval(()=>{
							if (dz < this.size[0].z){
								setTimeout(()=>{
									for (let dx=this.size[0].x; dx<=this.size[1].x; dx++){
										this.updateColumn(ox+dx, oz+dz+1);
										this.updateColumn(ox+dx, oz+dz);
									}
								},0);
								clearInterval(loadChunk_id);
								
								if (finishCallback)
									finishCallback();
								return;
							}
							
							//正常代码
							for (let dx=this.size[0].x; dx<=this.size[1].x; dx++)
								this.loadColumn(ox+dx, oz+dz, columns);
							
							setTimeout(()=>{
								this.updateColumn(ox+this.size[0].x-1, oz+dz);
								this.updateColumn(ox+this.size[1].x+1, oz+dz);
								for (let dx=this.size[0].x; dx<=this.size[1].x; dx++)
									this.updateColumn(dx, oz+dz+1);
							}, 0);
							
							dz--;
						},0); */
						break;
					}
				
				default: // "x+" or else
					{
						let t0 = +new Date(),
							num = 0;
						
						/*let dx;
						if (breakPoint){
							dx = breakPoint.dx==undefined? this.size[0].x: breakPoint.dx;
							delete breakPoint.dx;
						}else{
							dx = this.size[0].x;
						}*/
						for (let i=dx; i<=this.size[1].x; i++){
							
							/*let dz;
							if (breakPoint){
								dz = breakPoint.dz==undefined? this.size[0].z: breakPoint.dz;
								delete breakPoint.dz;
							}else{
								dz = this.size[0].z;
							}*/
							for (let j=dz; j<=this.size[1].z; j++){
								this.loadColumn(ox+i, oz+j, columns);
								if (new Date()-t0 > breakTime) //超时
									return setTimeout(()=>
										this.loadChunkAsync(x, z, {
											finishCallback,
											progressCallback,
											breakTime,
											mostSpeed,
											dir,
											breakPoint: {dx:i, dz:j+1, columns},
										}), 0);
							}
							dz = this.size[0].z;
							
							/*setTimeout(()=>{ //更新
								this.updateColumn(ox+dx, oz+this.size[0].z-1);
								this.updateColumn(ox+dx, oz+this.size[1].z+1);
								for (let dz=this.size[0].z; dz<=this.size[1].z; dz++)
									this.updateColumn(ox+dx+1, dz);
							}, 0);*/
							if (progressCallback)
								progressCallback( (i-this.size[0].x)/(this.size[1].x-this.size[0].x) );
							
							if (++num >= mostSpeed) //超数
								return setTimeout(()=>
									this.loadChunkAsync(x, z, {
										finishCallback,
										progressCallback,
										breakTime,
										mostSpeed,
										dir,
										breakPoint: {dx:i+1, columns}
									}), 0);
						}
						/*setTimeout(()=>{ //更新
							for (let dz=this.size[0].z; dz<=this.size[1].z; dz++){
								this.updateColumn(ox+this.size[0].x, oz+dz);
								this.updateColumn(ox+this.size[0].x-1, oz+dz);
							}
						
						},0);*/
						
						this.finishLoadChunk(x, z); //区块加载完毕
						
						if (finishCallback) finishCallback();
						
						/* let dx = this.size[0].x;
						let loadChunk_id = setInterval(()=>{
							if (dx > this.size[1].x){
								setTimeout(()=>{
									for (let dz=this.size[0].z; dz<=this.size[1].z; dz++){
										this.updateColumn(ox+dx-1, oz+dz);
										this.updateColumn(ox+dx, oz+dz);
									}
								},0);
								clearInterval(loadChunk_id);
								
								if (finishCallback)
									finishCallback();
								return;
							}
							
							//正常代码
							for (let dz=this.size[0].z; dz<=this.size[1].z; dz++)
								this.loadColumn(ox+dx, oz+dz, columns);
							
							setTimeout(()=>{
								this.updateColumn(ox+dx, oz+this.size[0].z-1);
								this.updateColumn(ox+dx, oz+this.size[1].z+1);
								for (let dz=this.size[0].z; dz<=this.size[1].z; dz++)
									this.updateColumn(ox+dx-1, dz);
							}, 0);
							
							dx++;
						},0); */
						break;
					}
				
			}
		};
		if (breakPoint.columns){
			func( breakPoint.columns );
		}else if (this.chunks[x] && this.chunks[x][z] && this.chunks[x][z].edit){
			const edit = this.chunks[x][z].edit;
			func( this.perGetChunk(x, z, edit) );
		}else{
			const edit = [];
			db.readStep(TABLE.WORLD, {
				index: "type",
				range: ["only", 0],
				stepCallback: (res)=>{
					if (
						res.x >= ox+this.size[0].x && res.x <= ox+this.size[1].x &&
						res.z >= oz+this.size[0].z && res.z <= oz+this.size[1].z
					) edit.push(res);
				},
				successCallback: ()=>{
					console.log("edit(DB):", x, z, edit);
					this.startLoadChunk(x, z, edit); //初始化区块
					func( this.perGetChunk(x, z, edit) );
				},
			});
			// const edit = DB.readChunk(x, z).then((edit)=>{
				
			// });
			/*sql.selectData(tableName, ["x", "y", "z", "id", "attr"],
				`type=0 AND`+
				` (x BETWEEN ${ ox+this.size[0].x } AND ${ ox+this.size[1].x }) AND`+
				` (z BETWEEN ${ oz+this.size[0].z } AND ${ oz+this.size[1].z })`,
				(edit)=>{
					console.log("edit(sql):", edit);
					func(new Array(...edit));
				}
			);*/
		}
	}
	//加载区块（生成器异步）
	loadChunkGenerator(x, z, opt={}){
		let {
			finishCallback,
			progressCallback,
			breakTime=66, // 最大执行时间/ms
			mostSpeed=2, // 最大速度/次
			dir="" //方向
		} = opt;
		
		x=Math.round(x), z=Math.round(z); //规范化
		const ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		// console.log("loadChunkGenerator", [x, z], this.getInitedChunks())
		if ( this.getInitedChunks().some(v => v[0]==x && v[1]==z) ) //已初始化
			return console.warn("loadChunkGenerator", x, z, "already inited");
		
		const gen = function* (columns, _this){
			switch ( dir.substr(0,2) ){
				case "x-":
					for (let i=_this.size[1].x; i>=_this.size[0].x; i--){
						for (let j=_this.size[0].z; j<=_this.size[1].z; j++){
							_this.loadColumn(ox+i, oz+j, columns);
							yield; //判断超时
						}
						// console.log("load", x, z, i)
						if (progressCallback)
							progressCallback( (i-_this.size[1].x)/(_this.size[0].x-_this.size[1].x) );
						yield true; //判断超数
					}
					
					_this.finishLoadChunk(x, z); //区块加载完毕
					break;
				
				case "z+":
					for (let j=_this.size[0].z; j<=_this.size[1].z; j++){
						for (let i=_this.size[0].x; i<=_this.size[1].x; i++){
							_this.loadColumn(ox+i, oz+j, columns);
							yield; //判断超时
						}
						// console.log("load", x, z, j)
						if (progressCallback)
							progressCallback( (j-_this.size[0].z)/(_this.size[0].z-_this.size[1].z) );
						yield true; //判断超数
					}
					
					_this.finishLoadChunk(x, z); //区块加载完毕
					break;
				
				case "z-":
					for (let j=_this.size[1].z; j>=_this.size[0].z; j--){
						for (let i=_this.size[0].x; i<=_this.size[1].x; i++){
							_this.loadColumn(ox+i, oz+j, columns);
							yield; //判断超时
						}
						// console.log("load", x, z, j)
						if (progressCallback)
							progressCallback( (j-_this.size[1].dz)/(_this.size[0].z-_this.size[1].z) );
						yield true; //判断超数
					}
					
					_this.finishLoadChunk(x, z); //区块加载完毕
					break;
				
				default:
					for (let i=_this.size[0].x; i<=_this.size[1].x; i++){
						for (let j=_this.size[0].z; j<=_this.size[1].z; j++){
							_this.loadColumn(ox+i, oz+j, columns);
							yield; //判断超时
						}
						// console.log("load", x, z, i)
						if (progressCallback)
							progressCallback( (i-_this.size[0].x)/(_this.size[1].x-_this.size[0].x) );
						yield true; //判断超数
					}
					
					_this.finishLoadChunk(x, z); //区块加载完毕
					break;
			}
		}
		
		const edit = [];
		db.readStep(TABLE.WORLD, {
			index: "type",
			range: ["only", 0],
			stepCallback: (res)=>{
				if (
					res.x >= ox+this.size[0].x && res.x <= ox+this.size[1].x &&
					res.z >= oz+this.size[0].z && res.z <= oz+this.size[1].z
				) edit.push(res);
			},
			successCallback: ()=>{
				console.log("edit(DB):", x, z, edit);
				this.startLoadChunk(x, z, edit); //开始加载区块
				
				const gener = gen( this.perGetChunk(x, z, edit), this ),
					id = setInterval(function work(){
						let res = {},
							t0 = +new Date(),
							num = 0;
						while ( !res.done ){
							res = gener.next();
							if (new Date()-t0 >= breakTime) //超时
								return;
							if (res.value == true && ++num >= mostSpeed) //超数
								return;
						}
						if (finishCallback) finishCallback(); //加载完毕
						clearInterval(id); //运行结束
					}, 0);
				return id;
			},
		});
	}
	
	//卸载区块（同步）
	unloadChunk(x, z){
		x = Math.round(x), z = Math.round(z); //规范化
		let ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		if ( !this.getLoadedChunks().some(v => v[0]==x && v[1]==z) ) //已卸载
			return console.warn("unloadChunk", x, z, "already unload");;
		
		this.startUnloadChunk(x, z); //开始卸载区块
		
		for (let dx=this.size[0].x; dx<=this.size[1].x; dx++)
			for (let dy=this.size[0].y; dy<=this.size[1].y; dy++)
				for (let dz=this.size[0].z; dz<=this.size[1].z; dz++)
					if ( this.get(ox+dx, dy, oz+dz) ){
						console.log("delete")
						for (let i of this.map[ox+dx][dy][oz+dz].block.mesh.material)
							i.dispose();
						this.map[ox+dx][dy][oz+dz].block.mesh.geometry.dispose(); //清除内存
						scene.remove(this.map[ox+dx][dy][oz+dz].block.mesh);
						delete this.map[ox+dx][dy][oz+dz];
					}
		
		this.finishUnloadChunk(x, z); //完成卸载区块
	}
	//卸载区块（异步）
	unloadChunkAsync(x, z, opt={}){
		let {
			finishCallback,
			progressCallback,
			breakTime=66, // 最大执行时间/ms
			mostSpeed=2, // 最大次数/次
			breakPoint={}
		} = opt,
		{
			dx=this.size[0].x,
			dy=this.size[0].y,
			dz=this.size[0].z
		} = breakPoint;
		
		x = Math.round(x), z = Math.round(z); //规范化
		const ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		if ( !this.getLoadedChunks().some(v => v[0]==x && v[1]==z) && !Object.keys(breakPoint).length ) //已卸载
			return console.warn("unloadChunkAsync", x, z, "already unload");;
		
		if (Object.keys(breakPoint).length < 3)
			this.startUnloadChunk(x, z); //开始卸载区块
		
		let t0 = +new Date(),
			num = 0;
		for (let i=dx; i<=this.size[1].x; i++){
			for (let j=dy; j<=this.size[1].y; j++){
				for (let k=dz; k<=this.size[1].z; k++){
					
					const block = this.get(ox+i, j, oz+k);
					if ( block ){ //非空气 & 非未加载
						block.block.mesh.material.forEach(v => v.dispose())
						block.block.mesh.geometry.dispose(); //清除内存
						scene.remove( block.block.mesh );
						delete this.map[ox+i][j][oz+k];
					}
					
					if (new Date()-t0 > breakTime) //超时
						return setTimeout(()=>
							this.unloadChunkAsync(x, z, {
								finishCallback,
								progressCallback,
								breakTime,
								mostSpeed,
								breakPoint: {dx:i, dy:j, dz:k+1}
							})
						, 0);
					
				}
				dz = map.size[0].z;
			}
			dy = map.size[0].y;
			
			if (progressCallback)
				progressCallback( (dx-this.size[0].x)/(this.size[1].x-this.size[0].x) )
			if (++num >= mostSpeed) //超数
				return setTimeout(()=>
					this.unloadChunkAsync(x, z, {
						finishCallback,
						progressCallback,
						breakTime,
						mostSpeed,
						breakPoint: {dx:i+1}
					})
				,0);
		}
		
		this.finishUnloadChunk(x, z); //完成卸载区块
		
		if (finishCallback) finishCallback();
		
			/* let dx = this.size[0].x;
			let unloadChunk_id = setInterval(()=>{
				if (dx > this.size[1].x){
					setTimeout(()=>{
						for (let dx=this.size[0].x; dx<=this.size[1].x; dx++){
							this.updateColumn(ox+dx, oz+this.size[0].z-1);
							this.updateColumn(ox+dx, oz+this.size[1].z+1);
						}
						for (let dz=this.size[0].z; dz<=this.size[1].z; dz++){
							this.updateColumn(ox+this.size[0].x-1, oz+dz);
							this.updateColumn(ox+this.size[1].x+1, oz+dz);
						}
					}, 0);
					clearInterval(unloadChunk_id);
					if (finishCallback)
						finishCallback();
					return;
				}
				
				//正常代码
				for (let dy=this.size[0].y; dy<=this.size[1].y; dy++){
					for (let dz=this.size[0].z; dz<=this.size[1].z; dz++){
						if (this.map[ox+dx][dy][oz+dz]){ //非空气 & 非未加载
							for (let i of this.map[ox+dx][dy][oz+dz].block.mesh.material)
								i.dispose();
							this.map[ox+dx][dy][oz+dz].block.mesh.geometry.dispose(); //清除内存
							scene.remove(this.map[ox+dx][dy][oz+dz].block.mesh);
						}
						delete this.map[ox+dx][dy][oz+dz];
					}
				}
				
				dx++;
			},0); */
		/* }else{ //无回调（不分顺序）
			for (let dx=this.size[0].x; dx<=this.size[1].x; dx++){
				setTimeout(()=>{
					
					//正常代码
					for (let dy=this.size[0].y; dy<=this.size[1].y; dy++){
						for (let dz=this.size[0].z; dz<=this.size[1].z; dz++){
							if (this.map[ox+dx][dy][oz+dz]){ //非空气 & 非未加载
								for (let i of this.map[ox+dx][dy][oz+dz].block.mesh.material)
									i.dispose();
								this.map[ox+dx][dy][oz+dz].block.mesh.geometry.dispose(); //清除内存
								scene.remove(this.map[ox+dx][dy][oz+dz].block.mesh);
							}
							delete this.map[ox+dx][dy][oz+dz];
						}
					}
					
				},0);
			}
		} */
	}
	//卸载区块（生成器异步）
	unloadChunkGenerator(x, z, opt={}){
		let {
			finishCallback,
			progressCallback,
			breakTime=66, // 最大执行时间/ms
			mostSpeed=2 // 最大次数/次
		} = opt;
		
		x = Math.round(x), z = Math.round(z); //规范化
		const ox = x*this.size.x,
			oz = z*this.size.z; //区块中心坐标
		
		// console.log("unloadChunkGenerator", [x, z], this.getLoadedChunks())
		if ( !this.getLoadedChunks().some(v => v[0]==x && v[1]==z) ) //已卸载
			return console.warn("unloadChunkGenerator", x, z, "already unload");;
		
		this.startUnloadChunk(x, z); //开始卸载区块
		
		const gen = function* (_this){
			for (let i=_this.size[0].x; i<=_this.size[1].x; i++){
				for (let j=_this.size[0].y; j<=_this.size[1].y; j++){
					for (let k=_this.size[0].z; k<=_this.size[1].z; k++){
						
						const block = _this.get(ox+i, j, oz+k);
						if ( block ){ //非空气 & 非未加载
							block.block.mesh.material.forEach(v => v.dispose())
							block.block.mesh.geometry.dispose(); //清除内存
							scene.remove( block.block.mesh );
							delete _this.map[ox+i][j][oz+k];
						}
						yield; //判断超时
						
					}
				}
				// console.log("unload", x, z, i)
				if (progressCallback)
					progressCallback( (i-_this.size[0].x)/(_this.size[1].x-_this.size[0].x) )
				yield true; //判断超数
			}
			
			_this.finishUnloadChunk(x, z); //完成卸载区块
		}
		
		const gener = gen( this ),
			id = setInterval(function work(){
				let res = {},
					t0 = +new Date(),
					num = 0;
				while ( !res.done ){
					res = gener.next();
					if (new Date()-t0 >= breakTime) //超时
						return;
					if (res.value == true && ++num >= mostSpeed) //超数
						return;
				}
				if (finishCallback) finishCallback(); //卸载完毕
				clearInterval(id); //运行结束
			}, 0);
		return id;
	}
	
	//预加载区块
	perloadChunk(opt={}){
		let {
			length=map.perloadLength, //加载范围（视野）
			progressCallback,
			finishCallback
		} = opt;
		const chunks = [];
		for (let x=-length; x<=length; x+=map.size.x){
			for (let z=-length; z<=length; z+=map.size.z){
				let push = [
					Math.round( (deskgood.pos.x+x)/100/map.size.x ),
					Math.round( (deskgood.pos.z+z)/100/map.size.z )
				];
				const dx = push[0]*map.size.x*100 - deskgood.pos.x,
						dz = push[1]*map.size.z*100 - deskgood.pos.z; //区块中心到玩家的距离
				push[2] = (
					Math.abs(dx) >= Math.abs(dz) ?(
						dx >= 0? "x+": "x-"
					): (
						dz >= 0? "z+": "z-"
					)
				);
					/*(
						(x>=0 && z>=0)? (
							Math.abs(x)>=Math.abs(z)?
								"x+"
							:
								"z+"
						):(x>=0 && z<0)? (
							Math.abs(x)>=Math.abs(z)?
								"x+"
							:
								"z-"
						):(x<0 && z>=0)? (
							Math.abs(x)>=Math.abs(z)?
								"x-"
							:
								"z+"
						): (
							Math.abs(x)>=Math.abs(z)?
								"x-"
							:
								"z-"
						)
					)
				];*/
				if ( !chunks.some(v => v[0]==push[0] && v[1]==push[1]) ) //没有相同的
					chunks.push(push);
			}
		}
		
		let loading=0, total=0; //当前正在加载 和 需加载总数
		
		if ( !chunks.length ){
			if (finishCallback)
				finishCallback();
			return console.warn("chunk_perload chunks:", chunks);
		}
		
		for (const i in chunks){
			const [cX, cZ] = chunks[i];
			if (this.getInitedChunks().every(function(value, index, arr){
				return value[0] != cX || value[1] != cZ;
			})){ //每个都不一样（不存在 & 不在加载中）
				// this.initChunk(cX, cZ);
				loading++;
				
				//用噪声填充区块
				this.loadChunkGenerator(cX, cZ, {
					breakTime: 16,
					dir: chunks[i][2],
					progressCallback: (v)=>{
						loading -= 1/(map.size.x);
						if (progressCallback)
							progressCallback((total-loading) / total); //反馈进度
					},
					finishCallback: ()=>{
						//更新区块
						this.updateChunkGenerator(cX, cZ, {
							breakTime: 16
						});
						
						if (loading < 1e-6 && finishCallback){ //完成所有
							finishCallback();
						}else if (progressCallback){
							progressCallback((total-loading) / total); //反馈进度
						}
					}
				});
			}
		}
		
		for (const i of this.getLoadedChunks())
			if (
				// (i[0] != 0 || i[1] != 0)&& //不是出生区块
				chunks.every((value, index, arr)=>{
					return i[0] != value[0] || i[1] != value[1];
				}) //不与任何chunk相等
			){
				loading++;
				const [cX, cZ] = i;
				//卸载区块
				this.unloadChunkAsync(...i, {
					breakTime: 16,
					progressCallback: (v)=>{
						loading -= 1/(map.size.x);
						if (progressCallback)
							progressCallback((total-loading) / total); //反馈进度
					},
					finishCallback: ()=>{
						if (loading < 1e-6 && finishCallback){ //完成所有
							finishCallback();
						}else if (progressCallback){
							progressCallback((total-loading) / total); //反馈进度
						}
					}
				});
			}
		
		total = loading;
	}
	
}