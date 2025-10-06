//* Promises Example :
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            next(error);            
            //-> We are passing error to "next" for further operation if failure happens otherwise passing parameters to requestHandler function.
        })
    }
}

export {asyncHandler}

//* Try-catch example :
// const asyncHandler = (func) => async(req, res, next) => {           // func is a wrapper function returning a async function
//     try {
//         await func(req, res, next);                           // If no error, pass paramters to "func" otherwise change "res" status to error code
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success : false,
//             message : error.message
//         });
//     }
// }
