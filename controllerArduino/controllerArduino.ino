// include the library code:
#include <LiquidCrystal.h>
#include <MIDI.h>

// define pin
#define buttonUp 2
#define confirmButton 3
#define buttonDown 4
#define led 13
#define knob1 A0
#define knob2 A1
#define knob3 A2

// number of knob that can be modified
#define numberOfItemsKnob 24

// initialize the lcd with the numbers of the interface pins
LiquidCrystal lcd(6, 7, 9, 10, 11, 12);

// create a MIDI default instance
MIDI_CREATE_DEFAULT_INSTANCE();

// lcd char of a musical note
byte note[] = {
  B00010,
  B00011,
  B00010,
  B00010,
  B01110,
  B11110,
  B11110,
  B01100
};

// declare some variables
float column;
bool isChanged;
int confirmed = -1;
bool confirmedIsPressed = false;
int indexKnob = numberOfItemsKnob-2;
int valFirstMenu;
int valSecondMenu;
int valThirdMenu;

int lastValueKnob1;
int lastValueKnob2;
int lastValueKnob3;


// array of knob that can be choosen
String knob[numberOfItemsKnob] = { "rangeOsc1", "waveformOsc1", "rangeOsc2","frequencyOsc2", "waveformOsc2" , "rangeOsc3","frequencyOsc3", "waveformOsc3" ,"volumeOsc1","volumeOsc2","volumeOsc3",
"volumeNoise","tremoloRate","depthRate","waveformRate","vibratoTime","vibratoFeedback","vibratoLevel","attack","decay","sustain","release","tune","volumeGeneral"};


void setup() {
  // begin pin
  pinMode(buttonUp, INPUT);
  pinMode(buttonDown,INPUT);
  pinMode(confirmButton,INPUT);
  pinMode(led,OUTPUT);
  
  // begin MIDI and LCD
  MIDI.begin();
  Serial.begin(115200);
  lcd.begin(16, 2);
  lcd.setCursor(0,2);
  lcd.createChar(0, note);
  lcd.home();

  lcd.print("    WELCOME!");
  lcd.setCursor(0,2);
  lcd.print("click 'continue'");
}

void loop() { 
  // read the input from the button and change indexes
  changeMenu();
  // display the right things on LCD
  displayMenu();
  delay(100);
}
 
void changeMenu(){
  if(digitalRead(buttonUp)==HIGH){
    switch (confirmed){
        case 0:
          increaseIndexKnob();
          break;
        case 1:
          increaseIndexKnob();
          break;
        case 2:
          increaseIndexKnob();
          break;
        case 3:
          break;
    }
    isChanged=true;
  }
  
  if(digitalRead(buttonDown)==HIGH){
    switch (confirmed){
      case 0:
          decreaseIndexKnob();
          break;
        case 1:
          decreaseIndexKnob();
          break;
        case 2:
          decreaseIndexKnob();
          break;
        case 3:
          break;  
    }
    isChanged=true;
  }
  
  if(digitalRead(confirmButton)==LOW){
    confirmedIsPressed=false;
  }

  if(digitalRead(confirmButton)==HIGH && !confirmedIsPressed){
    confirmedIsPressed=true;
    clickConfirmed();
    isChanged=true;
  }
}

void displayMenu(){
  switch(confirmed){
    case 0:
      if(isChanged){
        lcd.clear();
        lcd.print("function knob1:");
        lcd.setCursor(0,2);
        lcd.print(knob[indexKnob]);
        valFirstMenu = indexKnob;
      }
      break;
      
    case 1:
      if(isChanged){
        lcd.clear();
        lcd.print("function knob2:");
        lcd.setCursor(0,2);
        lcd.print(knob[indexKnob]);
        valSecondMenu = indexKnob;
      }
      break;
      
    case 2:
      if(isChanged){
        lcd.clear();
        lcd.print("function knob3:");
        lcd.setCursor(0,2);
        lcd.print(knob[indexKnob]);
        valThirdMenu = indexKnob;
      }
      break;
      
    case 3:
      if(isChanged){
        lcd.clear();
        play();
      }
      break;
  }
  isChanged=false;
}

void increaseIndexKnob(){
  if(indexKnob >= numberOfItemsKnob-1){
    indexKnob = 0;
  } else{
    indexKnob++;
  }
}

void decreaseIndexKnob(){
  if(indexKnob <= 0){
    indexKnob = numberOfItemsKnob -1;
  } else{
    indexKnob--;
  }
}

void clickConfirmed(){
  indexKnob = 0;
  if(confirmed >= 3){
    confirmed = 0;
  } else{
    confirmed++;
  }
}


void play() { 

  delay(1000);
  int noteToPrint=0;
  digitalWrite(led,HIGH);
  
  while(digitalRead(confirmButton)==LOW){
    playMidi();
    if(noteToPrint==0){
      randomSeed(millis());
      int raw = random(2);
      lcd.setCursor(column,raw);
      lcd.write((uint8_t)0);
      int deltacolumn = random(4) +2;
      column = column + deltacolumn;
    }

    noteToPrint++;
    if(noteToPrint==20){
       noteToPrint=0;
    }

    if(column >14){
      lcd.clear();
      lcd.home();
      column = 0;
    } else{
      delay(20);
    }
  }

  digitalWrite(led,LOW);
  column = 0;
  lcd.clear();
  lcd.print("click 'confirm'");
  lcd.setCursor(0,2);
  lcd.print("to continue");
}

void playMidi(){
    int valueRead1 = analogRead(A0);
    int valueRead2 = analogRead(A1);
    int valueRead3 = analogRead(A2);

    if(valueRead1 < lastValueKnob1-5 || valueRead1 > lastValueKnob1+5){
      lastValueKnob1 = valueRead1;
      int velocity1 = int(127-(valueRead1 * 127.0)/1023.0);
      int cmd1 = 0;
      switch(valFirstMenu){
      case 0:
        cmd1 = 102;
        break;
       case 1:
        cmd1 = 107;
        break;
       case 2:
        cmd1 = 103;
        break;
       case 3:
        cmd1 = 105;
        break;
       case 4:
        cmd1 = 108;
        break;
       case 5:
        cmd1 = 104;
        break;
       case 6:
        cmd1 = 106;
        break;
       case 7:
        cmd1 = 109;
        break;
       case 8:
        cmd1 = 110;
        break;
       case 9:
        cmd1 = 111;
        break;
       case 10:
        cmd1 = 112;
        break;
       case 11:
        cmd1 = 113;
        break;
       case 12:
        cmd1 = 21;
        break;
       case 13:
        cmd1 = 22;
        break;
       case 14:
        cmd1 = 23;
        break;
       case 15:
        cmd1 = 24;
        break;
       case 16:
        cmd1 = 25;
        break;
       case 17:
        cmd1 = 26;
        break;
       case 18:
        cmd1 = 27;
        break;
       case 19:
        cmd1 = 28;
        break;
       case 20:
        cmd1 = 29;
        break;
       case 21:
        cmd1 = 30;
        break;
       case 22:
        cmd1 = 20;
        break;
       case 23:
        cmd1 = 7;
        break;
    }
        MIDI.sendControlChange(cmd1,velocity1,1);
    }

    if(valueRead2 < lastValueKnob2-5 || valueRead2 > lastValueKnob2+5){
      lastValueKnob2 = valueRead2;
      int velocity2 = int(127-(valueRead2 * 127.0)/1023.0);
      int cmd2 = 0;
      switch(valSecondMenu){
      case 0:
        cmd2 = 102;
        break;
       case 1:
        cmd2 = 107;
        break;
       case 2:
        cmd2 = 103;
        break;
       case 3:
        cmd2 = 105;
        break;
       case 4:
        cmd2 = 108;
        break;
       case 5:
        cmd2 = 104;
        break;
       case 6:
        cmd2 = 106;
        break;
       case 7:
        cmd2 = 109;
        break;
       case 8:
        cmd2 = 110;
        break;
       case 9:
        cmd2 = 111;
        break;
       case 10:
        cmd2 = 112;
        break;
       case 11:
        cmd2 = 113;
        break;
       case 12:
        cmd2 = 21;
        break;
       case 13:
        cmd2 = 22;
        break;
       case 14:
        cmd2 = 23;
        break;
       case 15:
        cmd2 = 24;
        break;
       case 16:
        cmd2 = 25;
        break;
       case 17:
        cmd2 = 26;
        break;
       case 18:
        cmd2 = 27;
        break;
       case 19:
        cmd2 = 28;
        break;
       case 20:
        cmd2 = 29;
        break;
       case 21:
        cmd2 = 30;
        break;
       case 22:
        cmd2 = 20;
        break;
       case 23:
        cmd2 = 7;
        break;
    }
        MIDI.sendControlChange(cmd2,velocity2,1);
    }

     if(valueRead3 < lastValueKnob3-5 || valueRead3 > lastValueKnob3+5){
      lastValueKnob3 = valueRead3;
      int velocity3 = int(127-(valueRead3 * 127.0)/1023.0);
      int cmd3 = 0;
       switch(valThirdMenu){
      case 0:
        cmd3 = 102;
        break;
       case 1:
        cmd3 = 107;
        break;
       case 2:
        cmd3 = 103;
        break;
       case 3:
        cmd3 = 105;
        break;
       case 4:
        cmd3 = 108;
        break;
       case 5:
        cmd3 = 104;
        break;
       case 6:
        cmd3 = 106;
        break;
       case 7:
        cmd3 = 109;
        break;
       case 8:
        cmd3 = 110;
        break;
       case 9:
        cmd3 = 111;
        break;
       case 10:
        cmd3 = 112;
        break;
       case 11:
        cmd3 = 113;
        break;
       case 12:
        cmd3 = 21;
        break;
       case 13:
        cmd3 = 22;
        break;
       case 14:
        cmd3 = 23;
        break;
       case 15:
        cmd3 = 24;
        break;
       case 16:
        cmd3 = 25;
        break;
       case 17:
        cmd3 = 26;
        break;
       case 18:
        cmd3 = 27;
        break;
       case 19:
        cmd3 = 28;
        break;
       case 20:
        cmd3 = 29;
        break;
       case 21:
        cmd3 = 30;
        break;
       case 22:
        cmd3 = 20;
        break;
       case 23:
        cmd3 = 7;
        break;
    }
        MIDI.sendControlChange(cmd3,velocity3,1);
    }
}

