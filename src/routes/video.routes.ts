import { Response, } from 'restify';
import { Router, } from 'restify-router';
import videoController from '../controllers/video.controller';
import fs from 'fs';

const router = new Router();

router.get('/getVideosfromSource', async (req, res): Promise<Response> => {
    try {       
          
        await videoController.getVideosfromSource()   
       
        return res.json({ success: true, });
        
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});

router.get('/renameVideos', async (req, res): Promise<Response> => {
    try {       
          
        await videoController.RenameVideos()   
       
        return res.json({ success: true, });
        
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});
router.get('/cutVideo', async (req, res): Promise<Response> => {
    try {       
          
        await videoController.cutVideo()   
       
        return res.json({ success: true, });
        
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});
router.get('/createFile', async (req, res): Promise<Response> => {
    try {       
          
        await videoController.createFileTxt()   
       
        return res.json({ success: true, });
        
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});
router.get('/joinVideo', async (req, res): Promise<Response> => {
    try {       
          
        await videoController.joinVideo()   
       
        return res.json({ success: true, });
        
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});
router.get('/publishOnVideo', async (req, res): Promise<Response> => {
    try {       
          
        await videoController.publishOnVideoOnYoutube()   
       
        return res.json({ success: true, });
        
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});
export default router;