export default function getCycleDura(cycleType){
    switch(cycleType){
        case 1:
            return "Monthly";
        case 3:
            return "Quarterly";
        case 6:
            return "Half"
        case 12:
            return "Yearly"
    }
}