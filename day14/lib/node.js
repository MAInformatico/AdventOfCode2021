class Node{
    constructor(name){
        this.name = name;
        this.next = null;
    }

    toString(){
        return this.name;
    }
    
    reset(){
        this.next = null;
    }

};

module.exports = {
    Node,
};