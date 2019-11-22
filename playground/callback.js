let sum = (a, b, callback) => {
    setTimeout(() => {
        let result = a + b;
        callback(result);
    }, 2000);
};

sum(1, 4, result => {
    console.log(result);
});
