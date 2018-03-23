

function findPercentage(a) {
    return a/100;
}

tests({
    'It should test return the provided parameter': function() {
        var testPercent = 100;
        var result = findPercentage(testPercent);
        eq(result,1);
    }
});