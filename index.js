const templateID=[81342,81341],//templateID, I only logged 81342, i guess 81341 is for easy mode ghillie?
	huntingzoneID=[713],//zoneId, not really needed, just put in case bhs does a new shitty dungeon where it doesnt auto reset >.>
	noresetzones=[9713];//zones where no resetting is carried out, this is incase you dc before getting reward. 9713=ghillie. Add other zoneId if you add more dungeons to this mod.
const Command = require('command');
	
module.exports = function resetdungeon(dispatch) {
	let finishdungeon;
	const command = Command(dispatch)
	
	dispatch.hook('S_LOAD_TOPO', 1, (event) => {      
		if(noresetzones.includes(event.zone)===false && finishdungeon) {
			dispatch.toServer('C_RESET_ALL_DUNGEON',1,{}),
			finishdungeon=false,
			command.message('Reseted Dungeons')
		}
    })
	
	dispatch.hook('S_SPAWN_NPC',3,(event) => { 
		if(event.huntingZoneId===713 && templateID.includes(event.templateId)) {
			finishdungeon=true
		}
	})
}

//templateID should be npcs such as exit teleportals/reward chest that appears on dungeon completion or if not possible, final boss

//If in the future bhs adds a solo dungeon that does not auto resets on completion, 
//add the exitteleportal/rewardchest/last boss templateID+huntingzoneID to the respective arrays and then replace line 19 with this line:
//if(huntingzoneID.includes(event.huntingZoneId) && templateID.includes(event.templateId)) {
