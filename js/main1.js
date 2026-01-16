// 屏幕检测
let isPortraitMode = false;
let orientationCheckTimeout = null;

// 屏幕方向检测函数 - 放在 DOM元素定义之前
function checkScreenOrientation() {
	const orientationTip = document.querySelector('.orientation-tip');

	// 方法1：使用 window.innerWidth/innerHeight 判断（最可靠）
	const isPortraitBySize = window.innerHeight > window.innerWidth;
	// 方法2：使用 screen.orientation（现代浏览器）
	let isPortraitByOrientation = false;
	if (screen.orientation) {
		const orientation = screen.orientation.type;
		isPortraitByOrientation = orientation.includes('portrait');
	}
	// 方法3：使用 window.orientation（旧设备）
	let isPortraitByWindow = false;
	if (typeof window.orientation !== 'undefined') {
		isPortraitByWindow = Math.abs(window.orientation) !== 90;
	}
	// 最终判断：优先使用尺寸判断，因为它最可靠
	isPortraitMode = isPortraitBySize || isPortraitByOrientation || isPortraitByWindow;
	// 如果是竖屏，显示提示并隐藏内容
	if (isPortraitMode) {
		// 显示横屏提示
		orientationTip.style.display = 'flex';
		// 如果有主内容，隐藏它
		if (mainContainer && mainContainer.style.display === 'block') {
			mainContainer.style.display = 'none';
		}
		// 隐藏开篇内容（如果正在显示）
		if (openingScreen && openingScreen.style.display !== 'none') {
			openingScreen.style.display = 'none';
		}
	} else {
		// 横屏模式，隐藏提示
		orientationTip.style.display = 'none';
		// 恢复之前显示的内容
		if (openingScreen && openingScreen.style.display !== 'none') {
			openingScreen.style.display = 'block';
		} else if (mainContainer && openingScreen.style.display === 'none') {
			mainContainer.style.display = 'block';
		}
	}
}

// 章节背景图和前景火车图片配置
const chapterConfig = [{
		// 开篇
		id: 0,
		name: "开篇",
		bgColor: "#000000",
		bgImage: "/img/s0/bg1.png"
		// trainImage: "https://cdn-icons-png.flaticon.com/512/3097/3097140.png" // 对比列车图标
	},
	{
		// 第一篇章：绿皮记忆
		id: 1,
		name: "第一篇章：绿皮记忆·经济起步的负重前行",
		bgColor: "#1a1a2e",
		bgImage: "/img/s1/bg1_01.png",
		fixedTrainImage: "./img/s1/train1.PNG",
		fixedTrainPosition: {
			top: "60%",
			left: "20%",
			width: "300px",
			height: "auto"
		}
		// trainImage: "https://cdn-icons-png.flaticon.com/512/3097/3097139.png" // 绿皮火车
	},
	{
		// 第二篇章：首次提速
		id: 2,
		name: "第二篇章：首次提速·市场经济的春雷初动",
		bgColor: "#16213e",
		bgImage: "/img/s2/bg1_01.png",
		fixedTrainImage: "./img/s2/train2.PNG"
		// trainImage: "https://cdn-icons-png.flaticon.com/512/3097/3097141.png" // 红色涂装列车
	},
	{
		// 第三篇章：六次提速
		id: 3,
		name: "第三篇章：六次提速·经济升级催生高铁萌芽",
		bgColor: "#0f3460",
		bgImage: "/img/s3/bg1_01.png",
		fixedTrainImage: "./img/s3/train3.PNG"
		// trainImage: "https://cdn-icons-png.flaticon.com/512/3097/3097142.png" // 蓝色空调列车
	},
	{
		// 第四篇章：高铁元年
		id: 4,
		name: "第四篇章：高铁元年·经济动脉的破局之战",
		bgColor: "#1a1a2e",
		bgImage: "/img/s4/bg1_01.png",
		fixedTrainImage: "./img/s4/train4.PNG"
		// trainImage: "https://cdn-icons-png.flaticon.com/512/3097/3097143.png" // 白色流线型列车
	},
	{
		// 第五篇章：八纵八横
		id: 5,
		name: "第五篇章：八纵八横·经济版图的重构之力",
		bgColor: "#16213e",
		bgImage: "/img/s5/bg1_01.png",
		fixedTrainImage: "./img/s5/train5.PNG"
		// trainImage: "https://cdn-icons-png.flaticon.com/512/3097/3097144.png" // 复兴号列车
	},
	{
		// 第六篇章：智能高铁
		id: 6,
		name: "第六篇章：智能高铁·经济实力的世界名片",
		bgColor: "#0f3460",
		bgImage: "/img/s6/bg1_01.png",
		fixedTrainImage: "./img/s6/train6.PNG"
		// trainImage: "https://cdn-icons-png.flaticon.com/512/3097/3097145.png" // 智能复兴号
	},
	{
		// 结语
		id: 7,
		name: "结语",
		bgColor: "#0a1931",
		bgImage: "/img/s0/bg1.png",
		// trainImage: "https://cdn-icons-png.flaticon.com/512/3097/3097146.png" // 高铁飞驰
	}
];

// 视频数据
const videoData = {
	"乘坐新干线": {
		title: "邓小平乘坐日本“光号”新干线",
		url: "./video/s1-1.mp4",
		thumbnail: "./video/thumb/s1-1.jpg"
	},

	"时代呼唤1": {
		title: "《时代呼唤》片段-铁路货运",
		url: "./video/s1-2.mp4",
		thumbnail: "./video/thumb/s1-2.jpg"
	},
	"时代呼唤2": {
		title: "《时代呼唤》片段-春运现象",
		url: "./video/s2-1.mp4",
		thumbnail: "./video/thumb/s2-1.jpg"
	},
	"时代呼唤3": {
		title: "《时代呼唤》片段-广深铁路提速",
		url: "./video/s2-2.mp4",
		thumbnail: "./video/thumb/s2-2.jpg"
	},
	"时代呼唤4": {
		title: "《时代呼唤》片段-秦沈客运专线",
		url: "./video/s3-1.mp4",
		thumbnail: "./video/thumb/s3-1.jpg"
	},
	"时代呼唤5": {
		title: "《时代呼唤》片段-第六次大提速",
		url: "./video/s3-2.mp4",
		thumbnail: "./video/thumb/s3-2.jpg"
	},
	"京津突破": {
		title: "《京津突破》片段-京津城际铁路",
		url: "./video/s4-1.mp4",
		thumbnail: "./video/thumb/s4-1.jpg"
	},
	"亮剑京沪": {
		title: "《亮剑京沪》片段-京沪高铁开通",
		url: "./video/s4-2.mp4",
		thumbnail: "./video/thumb/s4-2.jpg"
	},
	"聚线成网1": {
		title: "《聚线成网》片段-哈大高铁通车",
		url: "./video/s5-1.mp4",
		thumbnail: "./video/thumb/s5-1.jpg"
	},
	"聚线成网2": {
		title: "《聚线成网》片段-杭绍台铁路开工",
		url: "./video/s5-2.mp4",
		thumbnail: "./video/thumb/s5-2.jpg"
	},
	"聚线成网3": {
		title: "《聚线成网》片段-“领航号”始发",
		url: "./video/s5-4.mp4",
		thumbnail: "./video/thumb/s5-4.jpg"
	},
	"陆地飞行": {
		title: "《陆地飞行》片段-复兴号问世",
		url: "./video/s5-3.mp4",
		thumbnail: "./video/thumb/s5-3.jpg"
	},
	"利国益民": {
		title: "《利国益民》片段-郑渝高铁开通",
		url: "./video/s6-1.mp4",
		thumbnail: "./video/thumb/s6-1.jpg"
	},
	"中国名片": {
		title: "《中国名片》片段-雅万高铁开通",
		url: "./video/s6-2.mp4",
		thumbnail: "./video/thumb/s6-2.jpg"
	}
};

// 画卷页面数据 - 所有内容平铺在一个超长的横向画卷中
// 为每个页面添加独立的背景图片
const pagesData = [
	// 开篇页面
	// {
	//     id: 0,
	//     chapter: "开篇",
	//     chapterIndex: 0,
	//     bgImage: "./img/s0/bg1.PNG", // 开篇页面背景
	//     content: `
	//         <h1 class="chapter-title">时代的速度：从绿皮车到复兴号的中国经济跃迁</h1>
	//         <div class="train-comparison" style="margin: 30px 0;">
	//             <div class="train-item">
	//                 <div class="train-icon">🚂</div>
	//                 <div class="train-text">绿皮车时代——缓慢、拥挤，却承载着一个农业国向工业国转型的沉重梦想。</div>
	//             </div>

	//             <div class="train-item">
	//                 <div class="train-icon">🚄</div>
	//                 <div class="train-text">高铁时代——迅捷、舒适，展现着一个制造大国向创新强国进发的磅礴力量。</div>
	//             </div>
	//         </div>
	//         <p class="page-text">从时速40公里到350公里，改变的不仅是速度，更是整个中国经济的发展范式。</p>
	//         <p class="page-text">请握紧这张穿越时空的车票，让我们一同见证这场人类经济史上最壮观的轨道革命。</p>
	//         <p class="page-text" style="color: #f8b500; margin-top: 40px; font-size: 20px;">← 向左滑动开始旅程 →</p>
	//     `
	// },
	// 第一篇章：绿皮记忆·经济起步的负重前行
	{
		id: 1,
		chapter: "第一篇章：绿皮记忆·经济起步的负重前行",
		chapterIndex: 1,
		bgImage: "./img/s1/bg1_01.png", // 第一篇章第一页背景
		content: `
					<div class='chapter-title station-1'>
						<h2>第一站：缓慢的时代（1978年前）</h3>
						<h3>绿皮记忆·经济起步的负重前行</h2>
						<div class="metal-corner corner-tl"></div>
						<div class="metal-corner corner-tr"></div>
					</div>
					<div class='s1-1 notebook-container'>
						<p class="notebook-content">这里是1978年，中国铁路平均时速仅40+公里。<br><br>
							中国经济刚从计划经济转向市场经济，1978年GDP仅3679亿元，工业基础薄弱，交通运力成为经济发展的突出瓶颈。<br>
						</p>
					</div>
                `
	},
	{
		id: 2,
		chapter: "第一篇章：绿皮记忆·经济起步的负重前行",
		chapterIndex: 1,
		bgImage: "./img/s1/bg1_02.png", // 第一篇章第二页背景
		content: `
                    <div class="s1-2 video-container" data-video="乘坐新干线">
                        <div class="video-placeholder">
                            <div class="video-play-btn">▶</div>
                            <div class="video-title">邓小平乘坐日本“光号”新干线</div>
                        </div>
                    </div>
					<div class='s1-2 notebook-container'>
						<p class="notebook-content">
							1978年10月26日，时任中国国务院副总理的邓小平在访问日本期间乘坐了日本的“光号”新干线。<br><br>
							彼时，全球仅有的两条高速铁路均位于日本；我国铁路机力结构薄弱，电力机型仅221台，传统牵引占绝对主导。<br><br>
							旅客列车最高时速90--100公里，但受线路条件与装备水平制约，平均运行速度仅40公里左右，运输效率亟待提升。
						</p>
					</div>
                `
	},
	{
		id: 3,
		chapter: "第一篇章：绿皮记忆·经济起步的负重前行",
		chapterIndex: 1,
		bgImage: "./img/s1/bg1_03.png", // 第一篇章第三页背景
		content: `
                    <div class="s1-3 notebook-container">
						<p class="notebook-content">
							1978年全国货运量24.89亿吨，仅相当于2024年运量的4.4%，铁路瓶颈制约特征明显。<br><br>
							铁路货运量为11.0119亿吨，一条铁道拖着四成多的国民经济走。<br>
						</p>
                        <div class="notebook-quote">
                            绿皮火车是当时长途出行的绝对主力，北京到广州需耗时近40小时，车厢内拥挤不堪，“一票难求”是常态。
							铁路货运能力更显紧张，煤炭、钢铁等工业原料运输时常“堵在路上”，甚至出现“以运定产”的情况——企业产量受制于运输量，
							凸显出交通基础设施与经济发展需求的严重不匹配。<br>
							但它同时也承载着希望：三线建设者通过它深入内地，知青通过它往返城乡，原材料通过它从矿区运往工厂。
							这是一条沉重但坚定的轨道，一个待兴的经济体，正在积蓄力量。
						</div>
					</div>
					<div class="s1-3 video-container" data-video="时代呼唤1">
					    <div class="video-placeholder">
					        <div class="video-play-btn">▶</div>
					        <div class="video-title">《时代呼唤》片段-铁路货运</div>
					    </div>
					</div>
                `
	},
	{
		id: 4,
		chapter: "第一篇章：绿皮记忆·经济起步的负重前行",
		chapterIndex: 1,
		bgImage: "./img/s1/bg1_04.png", // 第一篇章第四页背景
		content: `
                    <div class="s1-4 quiz-container">
                        <div class="quiz-question">1978年中国铁路平均时速约为？</div>
                        <div class="quiz-options">
                            <div class="quiz-option" data-index="0">40公里</div>
                            <div class="quiz-option" data-index="1">80公里</div>
                            <div class="quiz-option" data-index="2">120公里</div>
                            <div class="quiz-option" data-index="3">160公里</div>
                        </div>
                    </div>
					<div class='s1-4 notebook-container'>
						<p class="notebook-content">
							这是一条用蒸汽与钢铁铺就的慢速轨道，却在拥挤与匮乏中承载着国家转向市场的第一声汽笛，
							把落后的现实与对速度的渴望同时写进时代的车厢。
						</p>
					</div>
                `
	},
	// 第二篇章：首次提速·市场经济的春雷初动
	{
		id: 5,
		chapter: "第二篇章：首次提速·市场经济的春雷初动",
		chapterIndex: 2,
		bgImage: "./img/s2/bg2_01.png", // 第二篇章第一页背景
		content: `
					<div class='chapter-title station-2'>
						<h2>第二站：春天的加速（1980-1990年代）</h3>
						<h3>首次提速·市场经济的春雷初动</h2>
						<div class="metal-corner corner-tl"></div>
						<div class="metal-corner corner-tr"></div>
					</div>
					<div class='s2-1 notebook-container'>
						<p class="notebook-content">
							随着市场经济大门开启，沿海地区“三来一补”加工业蓬勃发展。<br><br>
							中国经济刚从计划经济转向市场经济，1978年GDP仅3679亿元，工业基础薄弱，交通运力成为经济发展的突出瓶颈。<br>
						</p>
					</div>
                    
                `
	},
	{
		id: 6,
		chapter: "第二篇章：首次提速·市场经济的春雷初动",
		chapterIndex: 2,
		bgImage: "./img/s2/bg2_02.png", // 第二篇章第二页背景
		content: `
                    <div class='s2-2 notebook-container'>
                    	<p class="notebook-content">
							1979年，春运历史性突破一亿人。<br><br>
                    		1984年，铁路春运首次突破5亿人次大关。<br><br>
							1989年，纪录被刷新至8亿人次。<br><br>
							十年间，客流总量扩张7倍，呈爆发式增长。<br>
							站车“超员”成为常态，干线能力全面告急，“春运难”成为年度经济现象。
                    	</p>
                    </div>
                    <div class="s2-2 video-container" data-video="时代呼唤2">
                        <div class="video-placeholder">
                            <div class="video-play-btn">▶</div>
                            <div class="video-title">《时代呼唤》片段-春运现象</div>
                        </div>
                    </div>  
                `
	},
	{
		id: 7,
		chapter: "第二篇章：首次提速·市场经济的春雷初动",
		chapterIndex: 2,
		bgImage: "./img/s2/bg2_03.png", // 第二篇章第三页背景
		content: `
                    <div class="s2-3 video-container" data-video="时代呼唤3">
                        <div class="video-placeholder">
                            <div class="video-play-btn">▶</div>
                            <div class="video-title">《时代呼唤》片段-广深铁路提速</div>
                        </div>
                    </div>
					<div class="s2-3 notebook-container">
						<p class="notebook-content">
							1991年，广深铁路提速项目落地。<br><br>
							1994年12月，广深铁路实现时速160公里运营，是当时中国第一条准高速铁路，为中国发展高速铁路，竖起了第一块里程碑。<br>
						</p>
					    <div class="notebook-quote">
					       提速背后，是经济体制的深刻变革。铁道部开始探索“投入产出,以路建路经济承包责任制”(简称大包干)的模式，凸显经济效益和“造血功能”。
						   把铁路的经济效益与自我积累、自我建设、自我发展紧密相连，将“投入产出”和“以路建路”有机融合。
						</div>
					</div>
                    
                `
	},
	{
		id: 8,
		chapter: "第二篇章：首次提速·市场经济的春雷初动",
		chapterIndex: 2,
		bgImage: "./img/s2/bg2_04.png", // 第二篇章第四页背景
		content: `
                    <div class="s2-4 quiz-container">
                        <div class="quiz-question">中国第一条准高速铁路是哪条？</div>
                        <div class="quiz-options">
                            <div class="quiz-option" data-index="0">京广线</div>
                            <div class="quiz-option" data-index="1">广深线</div>
                            <div class="quiz-option" data-index="2">京沪线</div>
                            <div class="quiz-option" data-index="3">成渝线</div>
                        </div>
                    </div>
					<div class='s2-4 notebook-container'>
						<p class="notebook-content">
							铁轨把时速多抬了十公里，却像把计划经济的铁门推开一条缝，让市场经济的东风恣意地灌进来——
							这点儿提速虽小，喊出的却是更高生产力的急迫需求，也是计划与市场双轨并行时最真切的碰撞声。
						</p>
					</div>
                `
	},
	// 第三篇章：六次提速·经济升级催生高铁萌芽
	{
		id: 9,
		chapter: "第三篇章：六次提速·经济升级催生高铁萌芽",
		chapterIndex: 3,
		bgImage: "./img/s3/bg3_01.png", // 第三篇章第一页背景
		content: `
                    <div class='chapter-title station-3'>
                    	<h2>第三站：六次大提速（1997-2007）</h3>
                    	<h3>六次提速·经济升级催生高铁萌芽</h2>
                    	<div class="metal-corner corner-tl"></div>
                    	<div class="metal-corner corner-tr"></div>
                    </div>
                    <div class='s3-1 notebook-container'>
                    	<p class="notebook-content">
                    		随着中国加入WTO，经济进入高速增长期，2007年GDP突破27万亿元，外贸规模持续扩大，人流、物流、资金流加速流动。<br>
                    		铁路必须跟上制造业扩张的步伐：沿海工厂的原材料需要运入，制成品需要运往港口。农民工从一年返乡一次变为频繁往返。<br><br>
                    		1997年4月1日，中国铁路第一次大提速。京广等干线时速提至140公里，平均旅行时速54.9公里，首开“夕发朝至”，运力扩容。<br>
                    		1998年10月1日，中国铁路第二次大提速。最高时速160公里，平均55.2公里，东西干线同步升级。<br>
                    		1999年，全长404千米的秦沈客运专线正式动工，是我国首条标准客运专线与高铁技术“试验田”。它不仅要破解运输难题，更要为中国高铁发展蹚出一条可行之路。
                    	</p>
                    </div>
					<div class="s3-1 video-container" data-video="时代呼唤4">
					    <div class="video-placeholder">
					        <div class="video-play-btn">▶</div>
					        <div class="video-title">《时代呼唤》片段-秦沈客运专线</div>
					    </div>
					</div>
                `
	},
	{
		id: 10,
		chapter: "第三篇章：六次提速·经济升级催生高铁萌芽",
		chapterIndex: 3,
		bgImage: "./img/s3/bg3_02.png", // 第三篇章第二页背景
		content: `
                    <div class='s3-2 notebook-container'>
                    	<p class="notebook-content">
                    		2000年10月12日，中国铁路第三次大提速。形成“四纵两横”提速网，最高时速160公里，平均时速60.3公里，集装箱班列上线。 <br><br> 
                    		2001年10月12日，中国铁路第四次大提速。网络覆盖全国，最高时速160公里，平均时速61.6公里，快速品牌成型。<br><br>
                    		2004年4月18日，中国铁路第五次大提速。干线200公里、重载5000吨并举，最高时速200公里，平均时速65.7公里，保障电煤和外贸运输。<br><br>
                    		2007年4月18日，中国铁路第六次大提速。时速200—250公里规模化，和谐号动车组首批投运，平均时速70.2公里，迈入高速阶段。
                    	</p>
                    </div>
					<div class="s3-2 video-container" data-video="时代呼唤5">
					    <div class="video-placeholder">
					        <div class="video-play-btn">▶</div>
					        <div class="video-title">《时代呼唤》片段-第六次大提速</div>
					    </div>
					</div>
                `
	},
	{
		id: 11,
		chapter: "第三篇章：六次提速·经济升级催生高铁萌芽",
		chapterIndex: 3,
		bgImage: "./img/s3/bg3_03.png", // 第三篇章第三页背景
		content: `
					<div class="s3-3 notebook-container">
					    <div class="notebook-quote">
					       六次大提速，使全国铁路平均旅行速度由四十多公里跃至七十公里以上，干线运力提升30%以上，年均释放GDP增量约200亿元、全社会节约效益300亿元。<br><br>
						   京广、京沪等干线沿途城市人均 GDP 增速比非提速城市高 3.7-7.8 个百分点，且随网络完善呈递增趋势。
						   沿线劳动力密集型产业占比下降，知识密集型服务业比重提升，铁路质量改善显著推动第三产业集聚。
						   环渤海、长三角、珠三角出现 1-2 小时“同城圈”，资金流、技术流、人才流加速向城市群汇聚，区域一体化水平明显提升。
						   铁路低运价降低全社会物流成本1个百分点，为“中国制造”出口腾飞和区域一体化注入持续动能。
						</div>
					</div>
                `
	},
	{
		id: 12,
		chapter: "第三篇章：六次提速·经济升级催生高铁萌芽",
		chapterIndex: 3,
		bgImage: "./img/s3/bg3_04.png", // 第三篇章第四页背景
		content: `
                    <div class="s3-4 quiz-container">
                        <div class="quiz-question">第六次大提速首批投用的动车组车型是？</div>
                        <div class="quiz-options">
                            <div class="quiz-option" data-index="0">复兴号</div>
                            <div class="quiz-option" data-index="1">和谐号</div>
                            <div class="quiz-option" data-index="2">先锋号</div>
                            <div class="quiz-option" data-index="3">中华之星</div>
                        </div>
                    </div>
					<div class='s3-4 notebook-container'>
						<p class="notebook-content">
							发展是硬道理，铁轨六次提起的速度，把“快捷与效率”写进钢轨，
							把“动能与效益”留给沿线的每一盏灯火，并为中国制造插上奔赴全球的强劲羽翼。
						</p>
					</div>
                `
	},
	// 第四篇章：高铁元年·经济动脉的破局之战
	{
		id: 13,
		chapter: "第四篇章：高铁元年·经济动脉的破局之战",
		chapterIndex: 4,
		bgImage: "./img/s4/bg4_01.png", // 第四篇章第一页背景
		content: `
                    <div class='chapter-title station-4'>
                    	<h2>第四站：从追赶到并跑（2008-2012）</h3>
                    	<h3>高铁元年·经济动脉的破局之战</h2>
                    	<div class="metal-corner corner-tl"></div>
                    	<div class="metal-corner corner-tr"></div>
                    </div>
                    <div class='s4-1 notebook-container'>
                    	<p class="notebook-content">
                    		2008年，中国GDP突破31万亿元，城市化进程加快，京津冀、长三角等城市群雏形显现，
							跨区域经济协作需求激增，亟需快速交通纽带连接。<br><br>
							2008年8月1日，京津城际铁路开通，时速达到每小时350公里。双城之间的经济、文化等交流更为便捷，京津城际铁路深刻促进区域发展。<br><br>
							京津城际铁路是中国第一条拥有完全自主知识产权、具有世界一流水平的高速铁路，标志着中国正式迈入高铁时代。
                    	</p>
                    </div>
					<div class="s4-1 video-container" data-video="京津突破">
					    <div class="video-placeholder">
					        <div class="video-play-btn">▶</div>
					        <div class="video-title">《京津突破》片段1</div>
					    </div>
					</div>
                `
	},
	{
		id: 14,
		chapter: "第四篇章：高铁元年·经济动脉的破局之战",
		chapterIndex: 4,
		bgImage: "./img/s4/bg4_02.png", // 第四篇章第二页背景
		content: `
                    <div class='s4-2 notebook-container'>
                    	<p class="notebook-content">
                    		同年四季度，国际金融危机冲击全球经济，中央迅速出台4万亿元投资计划，铁路建设被列为主攻方向，全年铁路基建投资突破3300亿元，比2007年翻了一番。<br><br>
                    		巨额投资直接扩大内需，带动钢铁、水泥、工程机械等上下游产能，对GDP增速形成托底效应。<br>
                    		数据显示，铁路建设每投资1亿元，可带动GDP增长2.63亿元，提供就业岗位6000个。<br>
							通常情况下高速铁路每公里约消耗水泥1.2万吨左右，桥梁占线要更多。铁路建设很大程度上能够帮助缓解水泥产能过剩。<br><br>
							2011年6月，京沪高铁全线开通运营。全长1318公里，是中国高铁从追赶到领跑的关键坐标。
                    	</p>
                    </div>
                   <div class="s4-2 video-container" data-video="亮剑京沪">
                       <div class="video-placeholder">
                           <div class="video-play-btn">▶</div>
                           <div class="video-title">《亮剑京沪》片段-京沪高铁开通</div>
                       </div>
                   </div>
                `
	},
	{
		id: 15,
		chapter: "第四篇章：高铁元年·经济动脉的破局之战",
		chapterIndex: 4,
		bgImage: "./img/s4/bg4_03.png", // 第四篇章第三页背景
		content: `
                    <div class="s4-3 notebook-container">
                    	<p class="notebook-content">
                    		2008-2012年，4年时间里，高铁运营里程从零到9356公里。<br><br>
                    		从“和谐号”到“复兴号”的种子，在这一时期埋下。<br>
                    	</p>
                        <div class="notebook-quote">
                           高铁大大强化了中心城市对周边地区的辐射和带动作用，同时促进了沿线各种生产要素和消费要素的优化配置和集聚发展，
						   有力支撑了新时代西部大开发、东北全面振兴、中部加快崛起和东部率先发展。<br><br>
						   高铁建设不仅是应对危机的逆周期调节工具，更是经济发展方式转型的关键布局：
							它拉动巨额投资，消化钢铁、水泥等过剩产能； 它催生高端装备制造新产业集群； 它重塑区域经济地理，为产业升级腾挪空间。
						   更重要的是，中国高铁开始从引进消化吸收走向自主创新，一步一步实现从追赶到并跑再到领跑的历程。
                    	</div>
                    </div>
                `
	},
	{
		id: 16,
		chapter: "第四篇章：高铁元年·经济动脉的破局之战",
		chapterIndex: 4,
		bgImage: "./img/s4/bg4_04.png", // 第四篇章第四页背景
		content: `
                    <div class="s4-4 quiz-container">
                        <div class="quiz-question">2008年开通的京津城际铁路最高时速为？</div>
                        <div class="quiz-options">
                            <div class="quiz-option" data-index="0">250公里</div>
                            <div class="quiz-option" data-index="1">300公里</div>
                            <div class="quiz-option" data-index="2">350公里</div>
                            <div class="quiz-option" data-index="3">400公里</div>
                        </div>
                    </div>
					<div class='s4-4 notebook-container'>
						<p class="notebook-content">
							铁轨提速，经济换挡。高铁把投资、产业、区域一体化串成一条高速走廊，
							经济反哺技术、资金与市场，让钢铁长龙在危机中跑出转型升级的加速度。
						</p>
					</div>
                `
	},
	// 第五篇章：八纵八横·经济版图的重构之力
	{
		id: 17,
		chapter: "第五篇章：八纵八横·经济版图的重构之力",
		chapterIndex: 5,
		bgImage: "./img/s5/bg5_01.png", // 第五篇章第一页背景
		content: `
                    <div class='chapter-title station-5'>
                    	<h2>第五站：新时代的网格（2012-2020）</h3>
                    	<h3>八纵八横·经济版图的重构之力</h2>
                    	<div class="metal-corner corner-tl"></div>
                    	<div class="metal-corner corner-tr"></div>
                    </div>
					<div class='s5-1 notebook-container'>
						<p class="notebook-content">
							这一时期，中国经济进入转型升级阶段，2020年GDP突破100万亿元，第三产业占比超过54%，消费、科技成为经济增长主引擎。<br><br>
							党的十八大以来，高铁建设进入高质量发展新阶段。“八纵八横”高铁网从蓝图变为现实，成为新时代协调发展的经济密码。<br><br>
							2012年12月1日，哈大高铁正式通车，这条穿越于哈尔滨与大连的冰雪银龙是住在东北地区人民的第一条高速铁路。
						</p>
					</div>
					<div class="s5-1 video-container" data-video="聚线成网1">
					    <div class="video-placeholder">
					        <div class="video-play-btn">▶</div>
					        <div class="video-title">《聚线成网》片段-哈大高铁通车</div>
					    </div>
					</div>
                `
	},
	{
		id: 18,
		chapter: "第五篇章：八纵八横·经济版图的重构之力",
		chapterIndex: 5,
		bgImage: "./img/s5/bg5_02.png", // 第五篇章第二页背景
		content: `
                    <div class='s5-2-1 notebook-container'>
                    	<p class="notebook-content">
                    		2017年12月，杭绍台铁路全线开工建设，是中国第一条由民营资本联合控股的高铁线路，开创了中国高铁投资融资的先河。
                    	</p>
                    </div>
					<div class="s5-2-1 video-container" data-video="聚线成网2">
					    <div class="video-placeholder">
					        <div class="video-play-btn">▶</div>
					        <div class="video-title">《聚线成网》片段-杭绍台铁路开工</div>
					    </div>
					</div>
					<div class='s5-2-2 notebook-container'>
						<p class="notebook-content">
							2017年，CTCS-3级列控系统首次在大西线试验取得圆满成功，满足最高运营时速350公里、最小追踪间隔时间3分钟的运营要求，处于世界领先水平。<br><br>
							2017年12月5日，中国标准动车组“复兴号”问世，标志着中国动车组技术实现全面自主化。
						</p>
					</div>
					<div class="s5-2-2 video-container" data-video="陆地飞行">
					    <div class="video-placeholder">
					        <div class="video-play-btn">▶</div>
					        <div class="video-title">《陆地飞行》片段-复兴号问世</div>
					    </div>
					</div>
					<div class='s5-2-3 notebook-container'>
						<p class="notebook-content">
							2018年7月，为沪渝蓉高铁跨江定制的世界最大直径盾构机“领航号”始发，智慧平台精准控掘，高铁穿江不减速，“中国智造”锋芒初现。
						</p>
					</div>
					<div class="s5-2-3 video-container" data-video="聚线成网3">
					    <div class="video-placeholder">
					        <div class="video-play-btn">▶</div>
					        <div class="video-title">《聚线成网》片段-“领航号”始发</div>
					    </div>
					</div>
                `
	},
	{
		id: 19,
		chapter: "第五篇章：八纵八横·经济版图的重构之力",
		chapterIndex: 5,
		bgImage: "./img/s5/bg5_03.png", // 第五篇章第三页背景
		content: `
                    
					<div class='s5-3-1 notebook-container'>
						<p class="notebook-content">
							2020年7月1日，沪苏通长江公铁大桥铁路开通运营，把南通接入上海1小时通勤圈，为长三角补上南北断档，港城联动、产业协同从此通江达海。<br><br>
							2020年12月，中国通号全套自主化CTCS-3级列车运行控制系统装备合安高铁。<br><br>
							2020年底，中国高铁营业里程达3.79万公里，覆盖95%以上50万人口城市。高铁旅客发送量占铁路客运量70%，高铁全产业链就业人口超1000万。<br><br>
							中国标准动车组完全自主知识产权，IGBT芯片等核心技术突破，高铁成为创新驱动战略的典范。
						</p>
					</div>
                    <div class="s5-3-2 notebook-container">
                        <div class="notebook-quote">
                           “八纵八横”的高铁网逐渐织就：福厦高铁是我国首条跨海高铁，形成高效便捷的东南沿海快速通道；京广高铁串联南北经济带，让广州的电子元件4小时直达北京；
						   沪昆高铁贯通东西，带动云南鲜花、贵州茶叶等特色产品24小时销往全国……<br><br>
                    	   高铁的“时空压缩”效应重塑经济格局，把消费、科创急需的广度深度一次补齐。
						   把城市连成群、把要素聚成链，为当时中国这个第三产业占比超54%的100万亿元经济体“提速换挡”；
						   反过来，高铁的升级需求牵引列控、盾构、IGBT等核心技术自主突破，国产率、民营资本、产业链就业同步跃升，
						   形成“创新驱动—投资放大—产业升级”的闭环，高铁与经济在新时代互为路轨、双向提速。
                    	</div>
                    </div>
                `
	},
	{
		id: 20,
		chapter: "第五篇章：八纵八横·经济版图的重构之力",
		chapterIndex: 5,
		bgImage: "./img/s5/bg5_04.png", // 第五篇章第四页背景
		content: `
                    <div class="s5-4 quiz-container">
                        <div class="quiz-question">2020年底中国高铁营业里程约？</div>
                        <div class="quiz-options">
                            <div class="quiz-option" data-index="0">2.5万公里</div>
                            <div class="quiz-option" data-index="1">3.79万公里</div>
                            <div class="quiz-option" data-index="2">4.5万公里</div>
                            <div class="quiz-option" data-index="3">5万公里</div>
                        </div>
                    </div>
					<div class='s5-4 notebook-container'>
						<p class="notebook-content">
							“八纵八横”落笔成图，复兴号呼啸成势。高铁以快速便捷的交通打破区域边界，把创新动能焊接在每一寸钢轨，
							正是习近平新时代经济思想“以人民为中心、高质量发展”在铁轨上的生动注脚。
						</p>
					</div>
                `
	},
	// 第六篇章：智能高铁·经济实力的世界名片
	{
		id: 21,
		chapter: "第六篇章：智能高铁·经济实力的世界名片",
		chapterIndex: 6,
		bgImage: "./img/s6/bg6_01.png", // 第六篇章第一页背景
		content: `
                    <div class='chapter-title station-6'>
                    	<h2>第六站：领跑全世界（2020至今）</h3>
                    	<h3>智能高铁·经济实力的世界名片</h2>
                    	<div class="metal-corner corner-tl"></div>
                    	<div class="metal-corner corner-tr"></div>
                    </div>
					<div class='s6-1 notebook-container'>
						<p class="notebook-content">
							中国经济迈向高质量发展阶段，2025年GDP预计突破130万亿元，自主创新能力大幅提升，高铁成为国家经济实力的重要象征。<br><br>
							2021年6月25日，“复兴号”智能动车组集中上线运行，扩大开行范围，覆盖18个省级行政区。<br><br>
							2022年6月20日，郑渝高速铁路全线开通运营。让“千里江陵一日还”变为现实，这是一条经济大动脉，也是一条文化风景线。
						</p>
					</div>
                    <div class="s6-1 video-container" data-video="利国益民">
                        <div class="video-placeholder">
                            <div class="video-play-btn">▶</div>
                            <div class="video-title">《利国益民》片段-郑渝高铁开通</div>
                        </div>
                    </div>
                `
	},
	{
		id: 22,
		chapter: "第六篇章：智能高铁·经济实力的世界名片",
		chapterIndex: 6,
		bgImage: "./img/s6/bg6_02.png", // 第六篇章第二页背景
		content: `
                    
					<div class='s6-2 notebook-container'>
						<p class="notebook-content">
							2023年10月17日，雅万高铁正式开通运营，是东南亚首条高铁、“一带一路”首站示范，也是中国高铁全链出海“第一单”。<br><br>
							泛亚铁路、中亚铁路、欧亚铁路一步步连通，中国铁路企业正逐渐成为世界名片。<br><br>
							2024年6月15日，京沪高铁上线运行，标志着复兴号智能动车组技术提升版列车研制完成。<br>
							2024年12月29日，CR450动车组成功下线，试验时速可达450公里，运营时速则稳定在400公里。<br>
							复兴号254项重要标准中，中国标准占84%，关键系统软件均为自主研发，拥有完全自主知识产权。<br>
							2025年12月26日，西安至延安高铁开通，全国高铁营业里程突破5万公里，占世界高铁总里程70%以上，规模已可绕地球赤道一圈有余。
						</p>
					</div>
					<div class="s6-2 video-container" data-video="中国名片">
					    <div class="video-placeholder">
					        <div class="video-play-btn">▶</div>
					        <div class="video-title">《中国名片》片段-雅万高铁开通</div>
					    </div>
					</div>
                `
	},
	{
		id: 23,
		chapter: "第六篇章：智能高铁·经济实力的世界名片",
		chapterIndex: 6,
		bgImage: "./img/s6/bg6_03.png", // 第六篇章第三页背景
		content: `
					<div class="s6-3 notebook-container">
						<p class="notebook-content">
							按照《“十四五”铁路科技创新规划》，智能动车将继续提升智能化水平，北斗、5G、AI赋能协同发力，
							全面支撑更高速度、更低能耗、更安全舒适的智能高铁新时代。<br>
						</p>
					    <div class="notebook-quote">
					       今天，我们乘坐的不仅是高铁，更是一个移动的“数字经济综合体”。从购票到出站的全程数字化高铁，正从交通基础设施升级为数字新基建的核心节点。<br><br>
						   高速铁路建设催生了高铁“交通经济带”，如旅行、物流、站城一体化等，促进乡村振兴，铁路自身从单纯运输企业，转变为平台型经济组织。
						   更重要的是，高铁的技术溢出效应正赋能整个国民经济。
						   2023年高铁带动沿线城市GDP增速平均高于全国水平1.2个百分点。
						   这种“廊道经济”模式正在重构中国经济地理格局，让区域发展从“点状突破”转向“轴带辐射”。
						</div>
					</div>
                `
	},
	{
		id: 24,
		chapter: "第六篇章：智能高铁·经济实力的世界名片",
		chapterIndex: 6,
		bgImage: "./img/s6/bg6_04.png", // 第六篇章第五页背景
		content: `
                    <div class="s6-4 quiz-container">
                        <div class="quiz-question">2024年12月下线的CR450试验时速达？</div>
                        <div class="quiz-options">
                            <div class="quiz-option" data-index="0">350公里</div>
                            <div class="quiz-option" data-index="1">400公里</div>
                            <div class="quiz-option" data-index="2">420公里</div>
                            <div class="quiz-option" data-index="3">453公里</div>
                        </div>
                    </div>
					<div class='s6-4 notebook-container'>
						<p class="notebook-content">
							智能高铁贯通东西南北，链接国内外，它把城市连成群、产业串成链，
							人流、物流、资金流沿轨奔涌，内需外循环一起提速，中国经济由此驶入更广阔的疆域。
						</p>
					</div>
                `
	},
	// 结语页面
	{
		id: 25,
		chapter: "结语",
		chapterIndex: 7,
		bgImage: "./img/s0/bg1.PNG", // 结语页面背景
		content: `
                    <div class="epilogue-content">
                        <p class="epilogue-text">车速定格，时代不息。恭喜您已亲历一条由钢轨托起的经济奇迹。<br><br>
						请带着这张“中国速度见证者”海报启程，把今天的自豪化作前行的动力，我们路上再见！</p>
                        
                        <div class="poster-container">
                            <div class="poster-icon">🚄</div>
                            <div class="poster-title">中国速度见证者</div>
                            <div class="poster-subtitle">时代的速度：从绿皮车到复兴号的中国经济跃迁</div>
                            <div class="poster-text">感谢您参与这段穿越时代的旅程，见证中国铁路从时速40公里到350公里的壮丽变迁，感受中国经济由追赶到领跑的磅礴力量。</div>
                        </div>
                        
                        <p class="epilogue-ending">—— 感谢观看 ——</p>
                    </div>
                `
	}
];

// DOM元素
const openingScreen = document.getElementById('openingScreen');
const mainContainer = document.getElementById('mainContainer');
const scrollContainer = document.getElementById('scrollContainer');
const scrollContent = document.getElementById('scrollContent');
const progressDots = document.getElementById('progressDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const openingSubtitle = document.getElementById('openingSubtitle');
const clickHint = document.getElementById('clickHint');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeVideoBtn = document.getElementById('closeVideoBtn');

// 状态变量
let currentPageIndex = 0;
let openingClickCount = 0;
let isScrolling = false;
let scrollTimeout;
let hintElement = null;
let hintShown = false;

// 初始化
function init() {
	// 先检查屏幕方向
	checkScreenOrientation();

	// 生成画卷页面
	pagesData.forEach((page, index) => {
		// 创建页面元素
		const pageElement = document.createElement('div');
		pageElement.className = 'scroll-page';
		pageElement.dataset.pageIndex = index;
		pageElement.id = `page-${index}`;

		// 添加章节类名，用于CSS样式
		const chapterConfigItem = chapterConfig[page.chapterIndex];
		if (chapterConfigItem) {
			pageElement.classList.add(`chapter-${page.chapterIndex}`);
		}

		// 创建背景
		const bgElement = document.createElement('div');
		bgElement.className = 'page-bg';

		// 设置背景图 - 优先使用页面自身的背景图
		if (page.bgImage) {
			// 使用页面指定的背景图
			bgElement.style.backgroundImage = `url('${page.bgImage}')`;
		}
		// 如果没有页面背景图，但章节配置有背景图，则使用章节背景图
		else if (chapterConfigItem && chapterConfigItem.bgImage) {
			bgElement.style.backgroundImage = `url('${chapterConfigItem.bgImage}')`;
		}
		// 都没有则使用纯色背景
		else {
			bgElement.style.backgroundColor = chapterConfigItem ? chapterConfigItem.bgColor : '#000';
		}

		// 创建前景火车图片
		// const trainElement = document.createElement('img');
		// trainElement.className = 'train-foreground';
		// trainElement.alt = `章节${page.chapterIndex}火车图片`;

		// // 设置火车图片 - 使用章节配置中的火车图片
		// if (chapterConfigItem && chapterConfigItem.trainImage) {
		// 	trainElement.src = chapterConfigItem.trainImage;
		// } else {
		// 	// 如果没有火车图片，使用默认图标
		// 	trainElement.style.display = 'none';
		// }

		// 创建内容
		const contentElement = document.createElement('div');
		contentElement.className = 'page-content';
		contentElement.innerHTML = page.content;

		pageElement.appendChild(bgElement);
		// pageElement.appendChild(trainElement);
		pageElement.appendChild(contentElement);
		scrollContent.appendChild(pageElement);

		// 生成进度点
		const dotElement = document.createElement('div');
		dotElement.className = 'progress-dot';
		dotElement.dataset.pageIndex = index;
		if (index === 0) dotElement.classList.add('active');
		progressDots.appendChild(dotElement);

	});
	// 创建固定位置的火车图片元素（章节共用）
	createFixedTrainElement();

	// 初始化开篇交互
	setupOpeningInteraction();

	// 初始化提示元素
	initHintElement();

	// 初始化章节交互
	setupChapterInteraction();

	// 为所有视频容器设置缩略图背景
	document.querySelectorAll('.video-container').forEach(container => {
		const videoKey = container.dataset.video;
		if (videoKey && videoData[videoKey] && videoData[videoKey].thumbnail) {
			const placeholder = container.querySelector('.video-placeholder');
			if (placeholder) {
				placeholder.style.backgroundImage = `url('${videoData[videoKey].thumbnail}')`;
				placeholder.style.backgroundSize = 'cover';
				placeholder.style.backgroundPosition = 'center';
			}
		}
	});

	// 初始化视频交互
	setupVideoInteraction();

	// 初始化导航
	setupNavigation();

	// 初始化视频模态框
	setupVideoModal();

	// 初始更新导航状态
	updateNavigation();

	// 初始滚动到第一页
	scrollToPage(0);

	// 初始显示火车图片
	updateFixedTrain();

	// 添加屏幕方向变化监听
	setupOrientationListeners();
}

// 设置屏幕方向监听器 - 新添加的函数
function setupOrientationListeners() {
	// 监听 orientationchange 事件（设备旋转时触发）
	window.addEventListener('orientationchange', function() {
		// 方向变化后延迟检查，确保设备已稳定
		clearTimeout(orientationCheckTimeout);
		orientationCheckTimeout = setTimeout(checkScreenOrientation, 300);
	});
	// 监听 resize 事件（折叠屏展开/收起时会触发）
	window.addEventListener('resize', function() {
		// 防抖处理
		clearTimeout(orientationCheckTimeout);
		orientationCheckTimeout = setTimeout(checkScreenOrientation, 300);
	});
	// 监听窗口 load 事件
	window.addEventListener('load', function() {
		checkScreenOrientation();
	});
}

// 初始化提示元素
function initHintElement() {
	// 创建提示元素
	hintElement = document.createElement('div');
	hintElement.id = 'slideHint';
	hintElement.className = 'railway-slide-hint';
	hintElement.innerHTML = `
			<div class="railway-signal-lamp"></div>
			<div class="railway-hint-text">
				<p>← 左右滑动<br>切换页面 →</p>
			</div>
	    `;

	// 将提示元素添加到body中
	document.body.appendChild(hintElement);

	// 初始状态下隐藏提示
	hintElement.style.display = 'none';
}

// 设置开篇交互
function setupOpeningInteraction() {
	openingScreen.addEventListener('click', handleOpeningClick);
}

// 处理开篇点击
function handleOpeningClick() {
	// 先检查是否是横屏模式
	if (isPortraitMode) {
		// 如果是竖屏，阻止点击并显示提示
		const orientationTip = document.querySelector('.orientation-tip');
		orientationTip.style.display = 'flex';
		return;
	}

	openingClickCount++;

	switch (openingClickCount) {
		case 1:
			setTimeout(() => {
				// greenTrain.style.display = 'flex';
				// highSpeedTrain.style.display = 'flex';
				setTimeout(() => {
					greenTrain.classList.add('show');
					highSpeedTrain.classList.add('show');
				}, 50);
			}, 300);
			openingSubtitle.innerHTML = `欢迎登上这趟穿越时代的列车`;
			clickHint.textContent = "再次点击继续";
			break;
		case 2:
			// greenTrain.classList.remove('show');
			// highSpeedTrain.classList.remove('show');
			openingSubtitle.innerHTML = `
                        <div class="opening-text-second">从时速40公里到350公里，改变的不仅是速度，更是整个中国经济的发展范式。</div>
                    `;
			clickHint.textContent = "点击开始旅程";
			break;
		case 3:
			openingSubtitle.innerHTML = `
		                <div class="opening-text-third">请握紧这张穿越时空的车票，让我们一同见证这场人类经济史上最壮观的轨道革命。</div>
		            `;
			clickHint.textContent = "点击开始旅程";
			break;
		case 4:
			// 切换到主内容
			openingScreen.style.opacity = '0';
			setTimeout(() => {
				openingScreen.style.display = 'none';
				mainContainer.style.display = 'block';
				setTimeout(() => {
					showHint();
				}, 500);
			}, 100);
			break;
	}
}

// 显示提示
function showHint() {
	// 先检查是否是横屏模式
	if (isPortraitMode) return;

	if (!hintElement || hintShown) return;
	hintElement.style.display = 'flex';
	hintShown = true;
	// 3秒后淡出提示
	// setTimeout(() => {
	// 	hintElement.classList.add('fade-out');
	// 	setTimeout(() => {
	// 		hintElement.style.display = 'none';
	// 	}, 1000);
	// }, 3000);
}

// 设置章节交互
function setupChapterInteraction() {
	// 为所有题目选项添加点击事件
	document.addEventListener('click', function(e) {
		if (e.target.classList.contains('quiz-option')) {
			const optionElement = e.target;
			const optionIndex = parseInt(optionElement.dataset.index);
			const quizContainer = optionElement.closest('.quiz-container');
			const options = quizContainer.querySelectorAll('.quiz-option');

			// 查找当前页面的quiz数据
			const pageId = parseInt(optionElement.closest('.scroll-page').dataset.pageIndex);
			const page = pagesData[pageId];

			// 确定正确答案（根据页面内容判断）
			let correctIndex = -1;
			if (page.id === 4) correctIndex = 0; // 1978年速度
			else if (page.id === 8) correctIndex = 1; // 广深线
			else if (page.id === 12) correctIndex = 1; // 和谐号
			else if (page.id === 16) correctIndex = 2; // 350公里
			else if (page.id === 20) correctIndex = 1; // 3.79万公里
			else if (page.id === 24) correctIndex = 3; // 453公里

			// 移除所有选项的状态类
			options.forEach(opt => {
				opt.classList.remove('correct', 'wrong');
			});

			// 标记正确答案和错误答案
			if (correctIndex >= 0) {
				options[correctIndex].classList.add('correct');
				if (optionIndex !== correctIndex) {
					optionElement.classList.add('wrong');
				}

				// 禁用所有选项
				options.forEach(opt => {
					opt.style.pointerEvents = 'none';
				});
			}
		}
	});

	// 进度点点击事件
	progressDots.addEventListener('click', function(e) {
		if (e.target.classList.contains('progress-dot')) {
			const targetPageIndex = parseInt(e.target.dataset.pageIndex);
			scrollToPage(targetPageIndex);
		}
	});

	// 键盘导航
	document.addEventListener('keydown', function(e) {
		if (e.key === 'ArrowLeft') {
			scrollToPrevPage();
		} else if (e.key === 'ArrowRight') {
			scrollToNextPage();
		}
	});

	// 监听滚动事件，更新当前页面
	scrollContainer.addEventListener('scroll', handleScroll);
}

// 设置视频交互
function setupVideoInteraction() {
	document.addEventListener('click', function(e) {
		// 先检查是否是横屏模式
		if (isPortraitMode) return;

		if (e.target.closest('.video-placeholder')) {
			const videoContainer = e.target.closest('.video-container');
			const videoKey = videoContainer.dataset.video;
			playVideo(videoKey);
		}
	});

	document.addEventListener('click', function(e) {
		if (e.target.closest('.video-placeholder')) {
			const videoContainer = e.target.closest('.video-container');
			const videoKey = videoContainer.dataset.video;
			playVideo(videoKey);
		}
	});
}

// 设置导航
function setupNavigation() {
	prevBtn.addEventListener('click', function() {
		if (!isPortraitMode) scrollToPrevPage();
	});

	nextBtn.addEventListener('click', function() {
		if (!isPortraitMode) scrollToNextPage();
	});

	// 触摸滑动支持
	let touchStartX = 0;
	let touchStartY = 0;
	let touchEndX = 0;
	let touchEndY = 0;

	scrollContainer.addEventListener('touchstart', function(e) {
		if (isPortraitMode) return;

		touchStartX = e.changedTouches[0].screenX;
		touchStartY = e.changedTouches[0].screenY;
	}, {
		passive: true
	});

	scrollContainer.addEventListener('touchend', function(e) {
		if (isPortraitMode) return;

		touchEndX = e.changedTouches[0].screenX;
		touchEndY = e.changedTouches[0].screenY;

		const deltaX = touchEndX - touchStartX;
		const deltaY = touchEndY - touchStartY;

		// 确保主要是水平滑动（防止误触垂直滚动）
		if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
			if (deltaX > 0) {
				// 向右滑动，前往上一页
				scrollToPrevPage();
			} else {
				// 向左滑动，前往下一页
				scrollToNextPage();
			}
		}
	}, {
		passive: true
	});
}

// 设置视频模态框
function setupVideoModal() {
	closeVideoBtn.addEventListener('click', closeVideoModal);

	videoModal.addEventListener('click', function(e) {
		if (e.target === videoModal) {
			closeVideoModal();
		}
	});

	// 按ESC键关闭视频
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape' && videoModal.style.display === 'flex') {
			closeVideoModal();
		}
	});
}

// 播放视频
function playVideo(videoKey) {
	if (isPortraitMode) return;

	if (videoData[videoKey]) {
		const video = videoData[videoKey];
		// 添加调试日志
		console.log('播放视频:', videoKey);
		console.log('视频URL:', video.url);
		console.log('缩略图URL:', video.thumbnail);

		modalVideo.src = video.url;
		modalVideo.poster = video.thumbnail;

		// 显示模态框
		videoModal.style.display = 'flex';

		// 播放视频
		setTimeout(() => {
			modalVideo.play().catch(e => {
				console.log('自动播放被阻止，需要用户交互');
			});
		}, 300);
	} else {
		console.error('视频数据不存在:', videoKey);
	}
}

// 关闭视频模态框
function closeVideoModal() {
	modalVideo.pause();
	videoModal.style.display = 'none';
}

// 处理滚动事件
function handleScroll() {
	// 先检查是否是横屏模式
	if (isPortraitMode) return;

	if (isScrolling) return;

	// 防抖处理
	clearTimeout(scrollTimeout);
	scrollTimeout = setTimeout(() => {
		updateCurrentPage();
	}, 100);
}

// 更新当前页面
function updateCurrentPage() {
	const scrollLeft = scrollContainer.scrollLeft;
	const pageWidth = window.innerWidth;
	const newPageIndex = Math.round(scrollLeft / pageWidth);

	if (newPageIndex !== currentPageIndex) {
		currentPageIndex = newPageIndex;
		updateProgressDots();
		updateNavigation();
		updateFixedTrain();
		checkHideHint();
	}
}

// 检查是否需要隐藏提示
function checkHideHint() {
	// 如果是最后一页，确保提示隐藏
	if (currentPageIndex === pagesData.length - 1) {
		if (hintElement && hintShown) {
			hintElement.style.display = 'none';
			hintShown = false;
		}
	}
}

// 创建固定位置的火车图片元素
function createFixedTrainElement() {
	const fixedTrain = document.createElement('img');
	fixedTrain.id = 'fixedTrain';
	fixedTrain.className = 'chapter-fixed-train';
	fixedTrain.alt = '章节火车图片';
	document.body.appendChild(fixedTrain); // 添加到body，使其固定定位生效
}
// 更新固定火车图片
function updateFixedTrain() {
	const currentPage = pagesData[currentPageIndex];
	if (!currentPage) return;

	const chapterIndex = currentPage.chapterIndex;
	const chapterConfigItem = chapterConfig[chapterIndex];
	const fixedTrain = document.getElementById('fixedTrain');

	if (chapterConfigItem && chapterConfigItem.fixedTrainImage) {
		// 更新火车图片
		fixedTrain.src = chapterConfigItem.fixedTrainImage;
		fixedTrain.style.display = 'block';

		// 移除所有章节类
		fixedTrain.className = 'chapter-fixed-train';
		// 添加当前章节类
		fixedTrain.classList.add(`chapter-${chapterIndex}`);
	} else {
		// 如果没有火车图片，隐藏
		fixedTrain.style.display = 'none';
	}
}

// 滚动到指定页面
function scrollToPage(pageIndex) {
	// 先检查是否是横屏模式
	if (isPortraitMode) return;

	if (pageIndex < 0 || pageIndex >= pagesData.length) return;

	isScrolling = true;
	currentPageIndex = pageIndex;

	const pageWidth = window.innerWidth;
	const scrollLeft = pageIndex * pageWidth;

	scrollContainer.scrollTo({
		left: scrollLeft,
		behavior: 'smooth'
	});

	// 更新进度点
	updateProgressDots();

	// 更新导航按钮状态
	updateNavigation();

	// 检查是否需要隐藏提示
	checkHideHint();

	updateFixedTrain();

	// 滚动完成后重置状态
	setTimeout(() => {
		isScrolling = false;
	}, 500);
}

// 滚动到上一页
function scrollToPrevPage() {
	// 先检查是否是横屏模式
	if (isPortraitMode) return;

	if (currentPageIndex > 0) {
		scrollToPage(currentPageIndex - 1);
	}
}

// 滚动到下一页
function scrollToNextPage() {
	// 先检查是否是横屏模式
	if (isPortraitMode) return;

	if (currentPageIndex < pagesData.length - 1) {
		scrollToPage(currentPageIndex + 1);
	}
}

// 更新进度点
function updateProgressDots() {
	const dots = progressDots.querySelectorAll('.progress-dot');
	dots.forEach((dot, index) => {
		if (index === currentPageIndex) {
			dot.classList.add('active');
		} else {
			dot.classList.remove('active');
		}
	});
}

// 更新导航按钮状态
function updateNavigation() {
	// 更新上一页按钮
	if (currentPageIndex === 0) {
		prevBtn.style.opacity = '0.3';
		prevBtn.style.pointerEvents = 'none';
	} else {
		prevBtn.style.opacity = '0.5';
		prevBtn.style.pointerEvents = 'auto';
	}

	// 更新下一页按钮
	if (currentPageIndex === pagesData.length - 1) {
		nextBtn.style.opacity = '0.3';
		nextBtn.style.pointerEvents = 'none';
	} else {
		nextBtn.style.opacity = '0.5';
		nextBtn.style.pointerEvents = 'auto';
	}
}

// 页面加载完成后初始化
// document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', function() {
	// 初始检查屏幕方向
	checkScreenOrientation();

	// 延迟初始化，确保方向检测完成
	setTimeout(init, 100);
});

// 处理窗口大小变化
window.addEventListener('resize', function() {
	// // 重新计算滚动位置
	// const pageWidth = window.innerWidth;
	// const scrollLeft = currentPageIndex * pageWidth;
	// scrollContainer.scrollLeft = scrollLeft;
	
	// 重新计算滚动位置
	    if (!isPortraitMode) {
	        const pageWidth = window.innerWidth;
	        const scrollLeft = currentPageIndex * pageWidth;
	        scrollContainer.scrollLeft = scrollLeft;
	    }
});

// 处理横竖屏切换
window.addEventListener('orientationchange', function() {
	// setTimeout(() => {
	// 	const pageWidth = window.innerWidth;
	// 	const scrollLeft = currentPageIndex * pageWidth;
	// 	scrollContainer.scrollLeft = scrollLeft;
	// }, 300);
	setTimeout(() => {
	        if (!isPortraitMode) {
	            const pageWidth = window.innerWidth;
	            const scrollLeft = currentPageIndex * pageWidth;
	            scrollContainer.scrollLeft = scrollLeft;
	        }
	    }, 300);
});
