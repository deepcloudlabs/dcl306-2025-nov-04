let names = ["Ali", "veli", "jack", "Şima", "Şule", "sema", "Ayşegül"]
console.log(names);
names.sort((x,y)=>x.localeCompare(y,"tr"));
console.log(names);
