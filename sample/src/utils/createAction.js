export default function createAction(type,payloadCreator) {
    const result = function () {
        return {
            type,
            payload:payloadCreator?payloadCreator.apply(this,arguments):{}
        }
    }
    result.toString = ()=> type;
    return result

}
