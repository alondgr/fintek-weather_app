function isIndex(s, a, b) {

    if (s.indexOf(a) > s.indexOf(b)) {
        return s.indexOf(a)
    }
    else if (s.indexOf(a) < s.indexOf(b)) {
        return s.indexOf(b)
    }
    else {
        return -1;
    }




};
isIndex("alon", "l", "n")