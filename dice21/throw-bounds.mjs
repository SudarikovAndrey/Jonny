// Camera-facing floor coordinate; shared by prediction and the visible simulation.
const FORWARD=Math.SQRT1_2,GROUND_PX=180*Math.sin(40*Math.PI/180);
export const FRONT_EDGE={player:1086,dealer:867};
export function containThrow(body,row){
 const p=body.translation(),limit=(FRONT_EDGE[row]-955)/GROUND_PX;
 const excess=(p.x+p.z)*FORWARD-limit;if(excess<=0)return;
 body.setTranslation({x:p.x-excess*FORWARD,y:p.y,z:p.z-excess*FORWARD},true);
 const v=body.linvel(),toward=(v.x+v.z)*FORWARD;
 if(toward>0)body.setLinvel({x:v.x-toward*FORWARD*1.2,y:v.y,z:v.z-toward*FORWARD*1.2},true);
}
