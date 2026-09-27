"""Original short cartoon cues for the Dice 21 table; no borrowed melodies."""
import json
from pathlib import Path
cues={}
def cue(name,length):
 cues[name]={'length':length,'events':[]};return cues[name]['events']
def note(e,p,n,t=0,d=.07,v=80):e.append(dict(part=p,note=n,at=t,duration=d,velocity=v))
e=cue('chip',.25);note(e,'wood',80,0,.035,90);note(e,'wood',74,.055,.025,55);note(e,'pizz',60,.012,.06,70)
e=cue('remove',.26);note(e,'wood',72,0,.03,83);note(e,'pizz',55,.045,.06,68)
e=cue('cup',.58)
for i,t in enumerate([0,.065,.12,.18,.25,.32,.40]):note(e,'wood',66+i%3*4,t,.026,45+i*4)
note(e,'pizz',48,.38,.1,66)
e=cue('impact',.21);note(e,'wood',64,0,.025,98);note(e,'pizz',43,.004,.055,79)
e=cue('score',.36);note(e,'xylophone',79,0,.065,75);note(e,'pizz',67,.018,.08,68);note(e,'clarinet',84,.085,.11,60)
e=cue('tick',.16);note(e,'wood',83,0,.022,49);note(e,'pizz',72,.008,.034,42)
e=cue('collect',.64)
for i,n in enumerate([72,76,79]):note(e,'xylophone',n,i*.075,.08,64)
for n in [48,55,60]:note(e,'pizz',n,.23,.16,75)
e=cue('draw',.75);note(e,'clarinet',67,0,.16,76);note(e,'clarinet',67,.23,.23,65);note(e,'pizz',48,.03,.1,65);note(e,'pizz',55,.27,.13,62)
e=cue('lose',.92)
for i,n in enumerate([55,52,48]):note(e,'trombone',n,i*.17,.17,70-i*4)
note(e,'pizz',36,.4,.15,84)
e=cue('open',.32);note(e,'wood',74,0,.025,58);note(e,'pizz',60,.05,.1,68)
e=cue('close',.3);note(e,'wood',67,0,.025,55);note(e,'pizz',48,.04,.1,60)
Path(__file__).with_name('scores.json').write_text(json.dumps(cues,indent=2))
