const puppeteer = require('puppeteer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class VideosYoutube{
    async getVideos(){
        try {
            const browser = await puppeteer.launch({
                headless: false,
                defaultViewport: {
                    width:1920,
                    height: 1080
                },
                args: ['--windows-size=1920, 1080']
            });
        
            const page = await browser.newPage();
            await page.goto('http://www.youtube.com');
        
            await page.waitForTimeout(1000);
            await page.type('input#search', 'Shorts');
            //await page.type('input#search', 'Shorts reels video 2 minutos');
        
            await page.waitForTimeout(1000);
            await page.click('#search-icon-legacy');
        
            await page.waitForTimeout(1000);
            const enlaces = await page.evaluate(() => {
                const elements = document.querySelectorAll('.ytd-video-renderer#video-title');
                //console.log(elements);
               
                const enlaces = [];
                         
                for (let element of elements) {
                    enlaces.push(element.href);
                }
                return enlaces;
            });
        
            for (let enlace of enlaces) {
                //const { stdout } = await exec(`youtube-dl -f 'worstvideo+worstaudio' -o './srcVideos/%(title)s.%(ext)s' ${enlace}`);
                const { stdout } = await exec(`youtube-dl -f mp4 -o srcvideos/%(title)s.%(ext)s ${enlace}`);
                console.log(stdout);
            }
        } catch (error) {
            throw error
        }
    }    
}
export default new VideosYoutube()