//app.js
const { UserAPI } = require('/api/api');

// ArticleAPI.findByPage({ ...params })
// .then(res => {
//   console.log(res)
//   
// }).catch(err => {
//   console.log('错了')
// });

//app.js
App({
  globalData: {
    collectData: [], // 收藏列表 {id: '', name: '', price: '', collected: ''}
    listData: [ // 所有书籍列表
      {
        id: '001',
        name: '红楼梦',
        author: '曹雪芹',
        authorIntro: '曹雪芹（约1715—约1763）是清代著名小说家，名沾，字梦阮，号雪芹，又号芹溪、芹圃。曹雪芹祖籍辽宁省辽阳市，出生地为江宁（今江苏南京），先祖为中原汉人，满洲正白旗包衣出身。《红楼梦》是曹雪芹“披阅十载，增删五次”，“字字看来皆是血，十年辛苦不寻常”的心血之作，今传《红楼梦》120回本，其中前80回的绝大部分出于曹雪芹的手笔，后40回则为高鹗所续写。',
        intro: '内容简介：《红楼梦》是章回体长篇小说，中国古代四大名著之首，原名《脂砚斋重评石头记》，又名《情僧录》、《风月宝鉴》、《金陵十二钗》、《还泪记》、《金玉缘》等。《红楼梦》是一部含笑的悲剧，描写了一个封建贵族家庭由荣华走向衰败的三代生活，而且还大胆地控诉了封建贵族阶级的无耻和堕落，指出他们的种种虚伪、欺诈、贪婪、腐朽和罪恶。红楼梦塑造的主要人物形象：《红楼梦》中的100多个人物形象各具姿态，大都有自己鲜明的个性特征，尤其是主要人物形象如贾宝玉、林黛玉、薛宝钗、贾母、王熙凤、史湘云、贾探春等，给我们留下了深刻的印象。',
        chapterList: [
          {
            id: 1,
            title: '第一回 甄士隐梦幻识通灵 贾雨村风尘怀闺秀',
            sketch: '浮生着甚苦奔忙，盛席华筵终散场。悲喜千般同幻泡，古今一梦尽荒唐。谩言红袖啼痕重，更有情痴抱恨长。字字看来皆是血，十年辛苦不寻常。'
          },
          {
            id: 2,
            title: '第二回 贾夫人仙逝扬州城 冷子兴演说荣国府',
            sketch: '一局输赢料不真，香销茶尽尚逡巡'
          },
          {
            id: 3,
            title: '第三回 托内兄如海酬训教 接外孙贾母惜孤女',
            sketch: '　“无故寻愁觅恨，有时似傻如狂。纵然生得好皮囊，腹内原来草莽。\n' +
              '　　潦倒不通世务，愚顽怕读文章。行为偏僻性乖张，那管世人诽谤。\n' +
              '　　富贵不知乐业，贫穷难耐凄凉。可怜辜负好韶光，于国于家无望。\n' +
              '　　天下无能第一，古今不肖无双。寄言纨袴与膏粱，莫效此儿形状。”'
          },
          {
            id: 4,
            title: '第四回 薄命女偏逢薄命郎 葫芦僧乱判葫芦案',
            sketch: '东海缺少白玉床，龙王来请金陵王。（都太尉统制县伯王公之后，共十二房，都中二房，馀在籍。）'
          },
          {
            id: 5,
            title: '第五回 游幻境指迷十二钗 饮仙醪曲演红楼梦',
            sketch: '春困葳蕤拥绣衾，恍随仙子别红尘。问谁幻入华胥境，千古风流造孽人。'
          },
          {
            id: 6,
            title: '第六回 贾宝玉初试云雨情 刘姥姥一进荣国府',
            sketch: '朝叩富儿门，富儿犹未足。虽无千金酬，嗟彼胜骨肉。'
          },
          {
            id: 7,
            title: '第七回 送宫花贾琏戏熙凤 宴宁府宝玉会秦钟',
            sketch: '十二花容色最新，不知谁是惜花人。相逢若问何名氏，家住江南姓本秦。'
          },
          {
            id: 8,
            title: '第八回 比通灵金莺微露意 探宝钗黛玉半含酸',
            sketch: '古鼎新烹凤髓香，那堪翠斝贮琼浆。莫言绮谷无风韵，试看金娃对玉郎。'
          }
        ],
        collected: false, // 是否被收藏
        price: 65,
        src: '../../images/book-list/HongLou.jpg',
        addNumber: 0
      },
      {
        id: '002',
        name: '西游记',
        author: '吴承恩',
        authorIntro: '吴承恩字汝忠，号射阳山人，淮安府山阳县（今江苏省淮安区）人，祖籍安徽省桐城县高甸（今枞阳县雨坛乡高甸），因随祖父迁徙至淮安府（今江苏省淮安市淮安区）。',
        intro: '内容简介：《西游记》是中国古代一部浪漫主义长篇神魔小说，主要描写了唐僧、孙悟空、猪八戒猪悟能、沙僧沙悟净师徒四人去西天取经，历经九九八十一难最后终于取得真经的故事。《西游记》内容分为三大部分：第一部分（一到七回）介绍孙悟空的神通广大，大闹天宫；第二部分（八到十二回）叙三藏取经的缘由；第三部分（十三到一百回）是全书故事的主体，写悟空等降伏妖魔，最终到达西天取回真经。《西游记》书中孙悟空这个形象，以其鲜明的个性特征，在中国文学史上立起了一座不朽的艺术丰碑。',
        chapterList: [
          {
            id: 1,
            title: '第一回灵根育孕源流出心性修持大道生',
            sketch: '灵根育孕源流出心性修持大道生'
          },
          {
            id: 2,
            title: '第二回悟彻菩提真妙理断魔归本合元神',
            sketch: '悟彻菩提真妙理断魔归本合元神'
          },
          {
            id: 3,
            title: '第三回四海千山皆拱伏九幽十类尽除名',
            sketch: '四海千山皆拱伏九幽十类尽除名'
          },
          {
            id: 4,
            title: '第四回官封弼马心何足名注齐天意未宁',
            sketch: '官封弼马心何足名注齐天意未宁'
          },
          {
            id: 5,
            title: '第五回乱蟠桃大圣偷丹反天宫诸神捉怪',
            sketch: '乱蟠桃大圣偷丹反天宫诸神捉怪'
          },
          {
            id: 6,
            title: '第六回观音赴会问原因小圣施威降大圣',
            sketch: '观音赴会问原因小圣施威降大圣'
          },
          {
            id: 7,
            title: '第七回八卦炉中逃大圣五行山下定心猿',
            sketch: '八卦炉中逃大圣五行山下定心猿'
          },
          {
            id: 8,
            title: '第八回我佛造经传极乐观音奉旨上长安',
            sketch: '我佛造经传极乐观音奉旨上长安'
          },
          {
            id: 9,
            title: '第九回陈光蕊赴任逢灾江流僧复仇报本',
            sketch: '陈光蕊赴任逢灾江流僧复仇报本'
          },
          {
            id: 10,
            title: '第十回老龙王拙计犯天条魏丞相遗书托冥吏',
            sketch: '老龙王拙计犯天条魏丞相遗书托冥吏'
          }
        ],
        collected: false,
        price: 78,
        src: '../../images/book-list/xiyou.jpg',
        addNumber: 0
      },
      {
        id: '003',
        name: '水浒传',
        author: '施耐庵',
        authorIntro: '施耐庵（1296年—1371年）是元末明初的文学家，今江苏兴化人。博古通今，才气横溢，相传是孔子七十二弟子之一施之常的后裔。',
        intro: '内容简介：《水浒传》描写北宋末年以宋江为首的一百零八位好汉在梁山起义，以及聚义之后接受招安、四处征战的故事，塑造了宋江、吴用、李逵、武松、林冲、鲁智深等梁山英雄，形象地描绘了农民起义从发生、发展直至失败的全过程，深刻揭示了起义的社会根源，满腔热情地歌颂了起义英雄的反抗斗争和他们的社会理想，也具体揭示了起义失败的内在历史原因。《水浒传》是中国历史上最早用白话文写成的章回小说之一。',
        chapterList: [
          {
            id: 1,
            title: '第一回 张天师祈禳瘟疫 洪太尉误走妖魔  ',
            sketch: '张天师祈禳瘟疫 洪太尉误走妖魔  '
          },
          {
            id: 2,
            title: '第二回 王教头私走延安府 九纹龙大闹史家村  ',
            sketch: '王教头私走延安府 九纹龙大闹史家村  '
          },
          {
            id: 3,
            title: '第三回 史大郎夜走华阴县 鲁提辖拳打镇关西  ',
            sketch: '史大郎夜走华阴县 鲁提辖拳打镇关西  '
          },
          {
            id: 4,
            title: '第四回 赵员外重修文殊院 鲁智深大闹五台山  ',
            sketch: '赵员外重修文殊院 鲁智深大闹五台山  '
          },
          {
            id: 5,
            title: '第五回 小霸王醉入销金帐 花和尚大闹桃花村  ',
            sketch: '小霸王醉入销金帐 花和尚大闹桃花村  '
          }
        ],
        collected: false,
        price: 88,
        src: '../../images/book-list/shuihu.jpg',
        addNumber: 0
      },
      {
        id: '004',
        name: '三国演义',
        author: '罗贯中',
        authorIntro: '罗贯中（约1330年－约1400年）是元末明初小说家，《三国演义》的作者，山西并州太原府人罗贯中写作的剧本：《赵太祖龙虎风云会》、《忠正孝子连环谏》、《三平章死哭蜚虎子》。',
        intro: '内容简介：《三国演义》（也称作《三国志通俗演义》）描写的是从东汉末年到西晋初年之间近一百年的历史风云。全书反映了三国时代的政治军事斗争，反映了三国时代各类社会矛盾的渗透与转化，概括了这一时代的历史巨变，塑造了一批咤叱风云的英雄人物。《三国演义》故事开始于刘备、关羽、张飞桃园三结义，结束于司马氏灭吴开晋，描写了东汉末年和三国时代魏、蜀、吴三国鼎立的局面及晋朝开国历史。文字浅显、人物形象刻画深刻、情节曲折、结构宏大。《三国演义》刻画了近200个人物形象，其中诸葛亮、曹操、关羽、刘备等人性格尤为突出。《三国演义》是中国第一部长篇章回体小说。'
        ,
        chapterList: [
          {
            id: 1,
            title: '第001回 宴桃园豪杰三结义 斩黄巾英雄首立功',
            sketch: '宴桃园豪杰三结义 斩黄巾英雄首立功'
          },
          {
            id: 2,
            title: '第002回 张翼德怒鞭督邮 何国舅谋诛宦竖',
            sketch: '张翼德怒鞭督邮 何国舅谋诛宦竖'
          },
          {
            id: 3,
            title: '第003回 议温明董卓叱丁原 馈金珠李肃说吕布',
            sketch: '议温明董卓叱丁原 馈金珠李肃说吕布'
          },
          {
            id: 4,
            title: '第004回 废汉帝陈留践位 谋董贼孟德献刀',
            sketch: '废汉帝陈留践位 谋董贼孟德献刀'
          }
        ],
        collected: false,
        price: 79,
        src: '../../images/book-list/sanguo.jpg',
        addNumber: 0
      }
    ],
    cartData: [ // 购物车列表 {id: '', name: '', price: '', addNumber: ''}
      {
        id: '001',
        name: '红楼梦',
        author: '曹雪芹',
        collected: false, // 是否被收藏
        price: 65,
        src: '../../images/book-list/HongLou.jpg',
        addNumber: 0
      },
      {
        id: '002',
        name: '西游记',
        author: '吴承恩',
        collected: false,
        price: 78,
        src: '../../images/book-list/xiyou.jpg',
        addNumber: 0
      },
      {
        id: '003',
        name: '水浒传',
        author: '施耐庵',
        collected: false,
        price: 88,
        src: '../../images/book-list/shuihu.jpg',
        addNumber: 0
      },
      {
        id: '004',
        name: '三国演义',
        author: '罗贯中',
        collected: false,
        price: 79,
        src: '../../images/book-list/sanguo.jpg',
        addNumber: 0
      }
    ],
    addressList: [
      {
        id: 1,
        province: '山西省',
        city: '太原市',
        area: '小店区',
        consigneeName: '姜姜',
        tel: '15735166538',
        address_details: 'AA学校',
        isDefault: false
      },
      {
        id: 2,
        province: '浙江省',
        city: '杭州市',
        area: '余杭区',
        consigneeName: '云溪',
        tel: '15735166538',
        address_details: '西溪联合科技广场',
        isDefault: false
      }
    ]
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },

  // toast
  showToast(title) {
    return wx.showToast({
      title: title,
      icon: 'warn',
      duration: 1000
    });
  },

  // 确认框
  showConfirmModal(title = '', content = '', con_text = '', can_text = '') {
    wx.showModal({
      title: title,
      content: content,
      success: function (res) {
        if (res.confirm && con_text) {
          console.log(con_text);
        } else {
          if (can_text) {
            console.log(can_text);
          }
        }

      }
    });
    return false;
  }
});
