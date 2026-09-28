//synchronous and asynchronous programming
// function hello() {
//     console.log("Hello,World");
// }
// hello();
// console.log("this is synchronous programming");

//Async programming: code is executed line by line but some code is executed in the background and does not block the main thread
//const hello = () => {
 //   setTimeout(() => {
   //     console.log("Hello,World");
   // }, 2000);
//}
//hello();
//console.log("this is asynchronous programming");
//create a function display(callback) that prints "welcome to ABES",then call callback which prints "learning FSD in Cse 21"
function display(callback){ 
    console.log("welcome to ABES");
    callback();
}
function learning(){
    console.log("learning FSD in Cse 21");
}
display(learning);