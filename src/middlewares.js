import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({dest: "uploads/avatars/"});

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  //fake login info
  res.locals.loggedUser = req.user || null;
  console.log(req.user);
  next();
};

export const onlyPublic = (req, res, next) =>{
  if(req.user){
    res.redirect(routes.home);
  } else{
    next();
  }
}

export const onlyPrivate = (req, res, next) =>{
  if(req.user){
    next();
  } else{
    res.redirect(routes.home);
  }
}
//locals에 있는 건 템플릿에서 변수명 처럼 존재

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");