# streaming-videos

Learn to stream any video using nodejs along with typescript.

The app uses `winston` logging and `express` backend to serve the video content.

![Final](./screenshots/Final%20webpage.png)


### Run the app
Use the following commands to run the app
```
npm run serve
```

This would produce an o/p that would look like this,
```
3:14:46 PM - Starting compilation in watch mode...
[0] 
[1] Running on port 8000
[0] 
[0] 3:14:50 PM - Found 0 errors. Watching for file changes.
[1] Running on port 8000
[1] info: Serving file...
[1] info: Requested video from 0 till 1000000 bytes
[1] info: Requested video from 31391744 till 31491129 bytes
[1] info: Requested video from 983040 till 1983040 bytes
[1] info: Requested video from 1983041 till 2983041 bytes
[1] info: Requested video from 2983042 till 3983042 bytes
[1] info: Requested video from 3983043 till 4983043 bytes
...
..
.
```

### Screenshot showing chunkeed video requests
![Chunked Video Requests](./screenshots/Chunked%20video%20requests.png)
