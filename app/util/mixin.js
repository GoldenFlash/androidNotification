/**
 * mixin
 * @author 王伟
 *time:2018-10-2
 */

const layout = {
    // 这里的形参顺序遵循css中的 “上、右、下、左”
    margin(...arg) {
        let margin = {};
        switch (arg.length) {
            case 1:
                margin = {
                    marginTop: arg[0],
                    marginRight: arg[0],
                    marginBottom: arg[0],
                    marginLeft: arg[0],
                };
                break;
            case 2:
                margin = {
                    marginVertical: arg[0],
                    marginHorizontal: arg[1],
                };
                break;
            case 3:
                margin = {
                    marginTop: arg[0],
                    marginHorizontal: arg[1],
                    marginBottom: arg[2],
                };
                break;
            case 4:
                margin = {
                    marginTop: arg[0],
                    marginRight: arg[1],
                    marginBottom: arg[2],
                    marginLeft: arg[3],
                };
                break;
            default:
                break;
        }
        return margin;
    },
    padding(...arg) {
        let padding = {};
        switch (arg.length) {
            case 1:
                padding = {
                    paddingTop: arg[0],
                    paddingRight: arg[0],
                    paddingBottom: arg[0],
                    paddingLeft: arg[0],
                };
                break;
            case 2:
                padding = {
                    paddingVertical: arg[0],
                    paddingHorizontal: arg[1],
                };
                break;
            case 3:
                padding = {
                    paddingTop: arg[0],
                    paddingHorizontal: arg[1],
                    paddingBottom: arg[2],
                };
                break;
            case 4:
                padding = {
                    paddingTop: arg[0],
                    paddingRight: arg[1],
                    paddingBottom: arg[2],
                    paddingLeft: arg[3],
                };
                break;
            default:
                break;
        }
        return padding;
    },
    border(...arg){
        //arg : style color width
        let border={}
        border={
            borderStyle: arg[0],
            borderColor:arg[1],
            borderTopWidth:arg[2],
            borderRightWidth:arg[2],
            borderLeftWidth:arg[2],
            borderBottomWidth:arg[2]
        }
        return border        
    },
    borderBottom(...arg){
        let borderBottom={}
        borderBottom={
            borderStyle: arg[0],
            borderColor:arg[1],
            borderBottomWidth:arg[2]
        }
        return borderBottom       
    },
    borderTop(...arg){
        let borderTop={}
        borderTop={
            borderStyle: arg[0],
            borderColor:arg[1],
            borderTopWidth:arg[2]
        }
        return borderTop
    },
    borderLeft(...arg){
        let borderLeft={}
        borderLeft={
            borderStyle: arg[0],
            borderColor:arg[1],
            borderLeftWidth:arg[2]
        }
        return borderLeft
    },
    borderRight(...arg){
        let borderRight={}
        borderRight={
            borderStyle: arg[0],
            borderColor:arg[1],
            borderRightWidth:arg[2]
        }
        return borderRight
    }
};
export default layout