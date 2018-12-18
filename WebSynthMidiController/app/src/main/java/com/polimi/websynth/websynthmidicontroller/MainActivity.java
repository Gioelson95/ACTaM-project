package com.polimi.websynth.websynthmidicontroller;

import android.content.Context;
import android.graphics.Color;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.media.midi.MidiDevice;
import android.media.midi.MidiDeviceInfo;
import android.media.midi.MidiInputPort;
import android.media.midi.MidiManager;
import android.os.Handler;
import android.os.Looper;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;

import java.io.IOException;

public class MainActivity extends AppCompatActivity
{

    private Button pitchButton;
    private Button sustainButton;

    private SensorManager sensorManager;
    private Sensor gyroscopeSensor;
    private SensorEventListener gyroscopeEventListener;
    private SensorEventListener orientationEventListener;
    private Sensor accelerometerSensor;
    private Sensor magnetiFieldSensor;

    private Context context;
    private MidiManager m;
    private MidiDeviceInfo[] infos;
    private MidiDeviceInfo info;
    private MidiInputPort inputPort;

    private float gyroValue = 0;
    private float gravity[];
    private float magnetic[];
    private float accels[] = new float[3];
    private float mags[] = new float[3];
    private float[] values = new float[3];

    private float azimuth;
    private float pitch;
    private float roll;

    private boolean sustain = false;
    private boolean pitchBend = true;


    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        pitchButton = findViewById(R.id.button_pitch);
        sustainButton = findViewById(R.id.button_sustain);

        pitchButton.setOnClickListener(view -> setPitchMode());
        sustainButton.setOnClickListener(view -> setSustainMode());

        setupMidi();
        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        gyroscopeSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
        accelerometerSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        magnetiFieldSensor = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);

        // Create a listener
        gyroscopeEventListener = new SensorEventListener()
        {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent)
            {

                if (sensorEvent.values[0]>4f)
                {
                    gyroValue = 4;
                }
                else if (sensorEvent.values[0]<-4f)
                {
                    gyroValue = -4;
                }
                else
                {
                    gyroValue = sensorEvent.values[0];
                }

                gyroValue = (gyroValue +4)/8;

                if (pitchBend)
                {
                    sendMidi(0xE0, 0, (int) (gyroValue * 127));
                }
            }

            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {}
        };

        orientationEventListener = new SensorEventListener()
        {
            @Override
            public void onSensorChanged(SensorEvent event)
            {
                switch (event.sensor.getType())
                {
                    case Sensor.TYPE_MAGNETIC_FIELD:
                        mags = event.values.clone();
                        break;

                    case Sensor.TYPE_ACCELEROMETER:
                        accels = event.values.clone();
                }

                if (mags!=null && accels != null)
                {
                    gravity = new float[9];
                    magnetic = new float[9];
                    SensorManager.getRotationMatrix(gravity,magnetic,accels,mags);
                    float[] outGravity = new float[9];
                    SensorManager.remapCoordinateSystem(gravity,SensorManager.AXIS_X,SensorManager.AXIS_Z,outGravity);
                    SensorManager.getOrientation(outGravity,values);

                    azimuth = values[0] * 57.2957795f;
                    pitch = values[1] * 57.2957795f;
                    roll = values[2] * 57.2957795f;
                    mags = null;
                    accels = null;

                    if (pitch>77f)
                    {
                        pitch = 0;
                    }
                    else if (pitch<77f)
                    {
                        pitch = 127;
                    }

                    if(sustain)
                    {
                        sendMidi(0xB0,64, (int) (pitch));
                    }
                }
            }

            @Override
            public void onAccuracyChanged(Sensor sensor, int accuracy) {}
        };
    }

    @Override
    protected void onResume()
    {
        super.onResume();
        sensorManager.registerListener(gyroscopeEventListener,gyroscopeSensor,sensorManager.SENSOR_DELAY_FASTEST);
        sensorManager.registerListener(orientationEventListener,accelerometerSensor,sensorManager.SENSOR_DELAY_NORMAL);
        sensorManager.registerListener(orientationEventListener,magnetiFieldSensor,sensorManager.SENSOR_DELAY_NORMAL);
    }

    @Override
    protected void onPause()
    {
        super.onPause();
        sensorManager.unregisterListener(gyroscopeEventListener);
        sensorManager.unregisterListener(orientationEventListener);
    }

    private void setPitchMode()
    {
        if(pitchBend)
        {
            pitchBend = false;
            pitchButton.setBackgroundColor(0xFFB71C1C);
            gyroValue = 0.5f;
            sendMidi(0xE0, 0, (int) (gyroValue * 127));
        }
        else
        {
            pitchBend = true;
            sustain = false;
            pitchButton.setBackgroundColor(0xFF00897B);
            sustainButton.setBackgroundColor(0xFFB71C1C);
            sendMidi(0xB0,64, 0);
        }
    }

    private void setSustainMode()
    {
        if(sustain)
        {
            sustain = false;
            sustainButton.setBackgroundColor(0xFFB71C1C);
            sendMidi(0xB0,64, 0);
        }
        else
        {
            pitchBend = false;
            sustain = true;
            pitchButton.setBackgroundColor(0xFFB71C1C);
            sustainButton.setBackgroundColor(0xFF00897B);
            gyroValue = 0.5f;
            sendMidi(0xE0, 0, (int) (gyroValue * 127));
        }
    }

    private void setupMidi()
    {
        context = getApplicationContext();

        m = (MidiManager)context.getSystemService(Context.MIDI_SERVICE);

        infos = m.getDevices();

        info = infos[0];

        m.openDevice(info, new MidiManager.OnDeviceOpenedListener()
                {
                    @Override
                    public void onDeviceOpened(MidiDevice device)
                    {
                        if (device == null)
                        {
                            Log.e("ERRORE", "could not open device " + info);
                        }
                        else
                        {
                            Log.e("OK", "open device " + info);
                            inputPort = device.openInputPort(0);
                            Log.e("info","input Port: " + inputPort);
                        }
                    }
                }, new Handler(Looper.getMainLooper())
        );
    }

    public void sendMidi(int type,int note,int velocity)
    {
        byte[] buffer = new byte[32];
        int numBytes = 0;
        int channel = 3;
        buffer[numBytes++] = (byte)(type + (channel - 1));
        buffer[numBytes++] = (byte)note;
        buffer[numBytes++] = (byte)velocity;
        int offset = 0;
        try
        {
            inputPort.send(buffer, offset, numBytes);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }
}