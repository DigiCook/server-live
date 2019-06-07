import child = require("child_process");
import events = require("events");

export class LiveController {
  public static publish(req, res) {
    console.info("[LiveController:publish]");

    const clientId: number = LiveController.clientId ++;
    const result: any = startFfmpeg(clientId);
    const { ffmpegLive, emitter } = result;
    const contentWriter = (buffer) => {
      res.write(buffer);
    };

    res.writeHead(200, {
        "Date": new Date().toUTCString(),
        "Connection": "close",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Content-Type": "video/webm",
        "Server": "WebM from rtsp stream",
    });

    emitter.on("data", contentWriter);

    res.on("close", () => {
        emitter.removeListener("data", contentWriter);
        console.info("[LiveController:publish] Connection closed by client " + clientId);
        if (ffmpegLive) {
          ffmpegLive.kill();
          console.info("[LiveController:publish] ffmpeg being killed....");
        } else {
          console.info("[LiveController:publish] no ffmpeg existing");
        }
    });

  }

  private static clientId: number = 0;
}

function startFfmpeg(clientId: number) {
  console.info("[LiveController:startFfmpeg] Starting FFMPEG for client " + clientId);

  const ffmpegParams = "-rtsp_transport tcp -i rtsp://193.168.1.10/11 -f webm -c:v libvpx -an -";

  console.info(`[LiveController:startFfmpeg] Executing : ffmpeg ${ffmpegParams}`);
  const ffmpegLive = child.spawn("ffmpeg", ffmpegParams.split(" "));

  ffmpegLive.on("close", (buffer) => {
      console.info("[LiveController:startFfmpeg] ffmpeg died", buffer);
  });

  const emitter = new events.EventEmitter().setMaxListeners(1);
  ffmpegLive.stdout.on("data", (buffer) => {
      emitter.emit("data", buffer);
  });

  return { ffmpegLive, emitter };
}
