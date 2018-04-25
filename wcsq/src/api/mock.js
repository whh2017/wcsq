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
        enableLogin: true
    });

    Mock.mock(`${baseUrl}/checkenroll`,{
       enableEnroll: true
    });
}
