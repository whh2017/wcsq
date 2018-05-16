/**
 * Created by stevenzwzhai on 2017/8/16.
 */
import Mock from 'mockjs'
const baseUrl = "http://localhost:8081"
const Random = Mock.Random
export default function () {
 
    // Mock.mock(`${baseUrl}/user`, {
    //   "data": Array(10).fill(1).map(() => {
    //     return {
    //       date: Random.date('yyyy-MM-dd'),
    //       name: Random.cname(),
    //       province: Random.province(),
    //       city: Random.city(),
    //       address: Random.county(),
    //       zip: Random.zip()
    //     }
    //   })
    // });

    Mock.mock(`${baseUrl}/checklogin`,{
        enableLogin: true,
        user: {
          mobile: 15999987056,
          name: "我喜欢DOTA",
          head_src: "../../static/init.jpg"
        }
    });

    Mock.mock(`${baseUrl}/checkenroll`,{
       enableEnroll: true
    });

     Mock.mock(`${baseUrl}/getplus`, {
      "data": Array(8).fill(1).map(() => {
        return {
          title: Random.ctitle(16),
          href: Random.url('http', 'wcsq.com')
        }
      })
    });

    Mock.mock(`${baseUrl}/getbbsplus`,{
      "data": Array(8).fill(1).map(() => {
        return {
          id: Random.id(),
          kinds: Random.ctitle(4),
          title: Random.ctitle(16),
          href: Random.domain(),
          head_src: Random.image('200x100'),
          name: Random.ctitle(5),
          start: Random.date('yyyy-MM-dd'),
          end: Random.date('yyyy-MM-dd'),
          comments: Random.natural(50, 200)
        }
      })
    });

    Mock.mock(`${baseUrl}/getplusbypage`,{
      "data": Array(8).fill(1).map(() => {
        return {
          id: Random.id(),
          kinds: Random.ctitle(4),
          title: Random.ctitle(16),
          href: Random.domain(),
          head_src: Random.image('200x100'),
          name: Random.ctitle(5),
          start: Random.date('yyyy-MM-dd'),
          end: Random.date('yyyy-MM-dd'),
          comments: Random.natural(50, 200)
        }
      })
    });

    Mock.mock(`${baseUrl}/publishplus`,{
      flag: true
   });

   Mock.mock(`${baseUrl}/getgoods`,{
    "data": Array(4).fill(1).map(() => {
      return {
       id: Random.id(),
       src: Random.image('250x450'),
       link: Random.domain(),
       username: Random.cname(),
       loc: Random.region(),
       title: Random.ctitle(4),
       time: Random.datetime('yyyy-MM-dd')
      }
    })
  });

   
    
}
