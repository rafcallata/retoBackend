import { Response, } from 'restify';
import { Router, } from 'restify-router';
import videoController from '../controllers/video.controller';
import fs from 'fs';

const router = new Router();

//recordar que con get se hace una consulta y seria req.query || y con post se envia el cuerpo por la api req.body para que hayga errores
router.get('/execute', async (req, res): Promise<Response> => {
    try {
        // const { } = req.query;
        // console.log(' ~ file: /test', req.body);
        await videoController.executeProccessToBuildReel()

        return res.json({ success: true, });
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});

router.get('/testMongoDB', async (req, res): Promise<Response> => {
    try {
        await videoController.testMongoDB()
        return res.json({ success: true, });
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});

router.get('/ffmpeg', async (req, res): Promise<Response> => {
    try {
        // const { } = req.query;
        // console.log(' ~ file: /test', req.body);
        await videoController.testingFfmpeg()

        return res.json({ success: true, });
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});

// router.get('/cutvideo',async (req, res): Promise<Response> => {
//     try {
//         const {nameVideo} = req.query
//         await videoController.cutVideo(nameVideo)

//         return res.json({success: true, });
//     } catch (error) {
//         return res.json({success: false, error: error.stack})
//     }
// });
router.get('/cutvideo', async (req, res): Promise<Response> => {
    try {       
        var files = fs.readdirSync("./srcVideos");
        let nameDir
        files.forEach(async file => {
            nameDir = file    
            await videoController.cutVideo(nameDir)   
        })      
        //const { nameVideo } = nameDir;
        
            return res.json({ success: true, });
        
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});
router.post('/cutvideoPost', async (req, res): Promise<Response> => {
    try {
        const { nameVideo, startTime, endTime, numberCpusAvailables } = req.body
        await videoController.cutVideoPost(nameVideo, startTime, endTime, numberCpusAvailables)

        return res.json({ success: true, });
    } catch (error) {
        return res.json({ success: false, error: error.stack })
    }
});

export default router;