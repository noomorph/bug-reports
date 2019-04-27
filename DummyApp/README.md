# Bug report

Detox Instruments does not record when given `-recordingPath` in launch args.

## Environment

1. MacOS Mojave 10.14.4
2. XCode 10.2.1
3. Node.js 10.15.0

## Steps

1. `npm install`
2. `npm start` (in a separate window)
3. `npm test`

## Actual result

1. Getting an error in the log:

```
detox[58473] ERROR: [SimulatorInstrumentsRecording.js/MOVE_FILE_ERROR] did not find temporary file: /private/var/folders/v5/hhnwwrr530j55yhql8jvf0580000gn/T/8008a8e7-5dc2-4187-b176-60fa00357e8f.dtxrec
```

2. Consequently, no `.dtxrec` recording in the artifacts location.

## Expected result

1. No error.
2. There should be `artifacts/.../Dummy App should have welcome screen/test.dtxrec` after the test.

## Why the bug is most likely not on Detox's JS side

If you run with `--loglevel trace`, you will see
the following commands that adhere to the protocol:

```
...
DEBUG: [exec.js/EXEC_CMD, #6] /bin/cat /dev/null >/Users/yaroslavs/Library/Developer/CoreSimulator/Devices/CFC55A39-351F-4C0B-9F7E-F457E72EE412/data/tmp/detox.last_launch_app_log.out 2>/Users/yaroslavs/Library/Developer/CoreSimulator/Devices/CFC55A39-351F-4C0B-9F7E-F457E72EE412/data/tmp/detox.last_launch_app_log.err && SIMCTL_CHILD_DYLD_INSERT_LIBRARIES="/Users/yaroslavs/Library/Detox/ios/b7a716d12ad5efe492d5194abf543dbca9de6e6f/Detox.framework/Detox" /usr/bin/xcrun simctl launch --stdout=/tmp/detox.last_launch_app_log.out --stderr=/tmp/detox.last_launch_app_log.err CFC55A39-351F-4C0B-9F7E-F457E72EE412 org.reactjs.native.example.DummyApp --args -detoxServer "ws://localhost:63514" -detoxSessionId "104e8e82-0e9a-beee-21ee-58fd25bcb560" -recordingPath "/private/var/folders/v5/hhnwwrr530j55yhql8jvf0580000gn/T/12c94fc8-2b29-4049-9d86-5cd9810f88d7.dtxrec"
...
TRACE: [AsyncWebSocket.js/WEBSOCKET_SEND] {"type":"setRecordingState","params":{},"messageId":3}
TRACE: [DetoxServer.js/MESSAGE] role=tester action=setRecordingState (sessionId=104e8e82-0e9a-beee-21ee-58fd25bcb560)
TRACE: [DetoxServer.js/MESSAGE] role=testee action=setRecordingStateDone (sessionId=104e8e82-0e9a-beee-21ee-58fd25bcb560)
...
TRACE: [Artifact.js/SAVE] saving SimulatorInstrumentsRecording to: artifacts/ios.sim.debug.2019-04-27 08-08-16Z/✓ Dummy App should have welcome screen/test.dtxrec
ERROR: [SimulatorInstrumentsRecording.js/MOVE_FILE_ERROR] did not find temporary file: /private/var/folders/v5/hhnwwrr530j55yhql8jvf0580000gn/T/12c94fc8-2b29-4049-9d86-5cd9810f88d7.dtxrec
```

Also, after finishing the test you can manually check that the recording has not appeared even with a delay.

```
$> ls "/private/var/folders/v5/hhnwwrr530j55yhql8jvf0580000gn/T/12c94fc8-2b29-4049-9d86-5cd9810f88d7.dtxrec"
ls: /private/var/folders/v5/hhnwwrr530j55yhql8jvf0580000gn/T/12c94fc8-2b29-4049-9d86-5cd9810f88d7.dtxrec: No such file or directory
```
