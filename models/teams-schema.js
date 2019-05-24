'use strict';

const players = require('./players-schema.js');
const mongoose = require('mongoose');

const teams = mongoose.Schema({
  name: { type:String, required:true },
}, {toObject:{virtuals:true}, toJSON:{virtuals:true}} );
/**
 * @function teams.virtual
 * Sets a virtual field in teams for attaching all players of that team
 */
teams.virtual('players', {
  ref: 'players',
  localField: 'name',
  foreignField: 'team',
  justOne: false,
});

/**
 * @function teams.pre
 * Pre Hook on teams
 */
teams.pre('find', function() {
  try {
    /**
     * @function this.populate('players')
     * Attaches players collection to teams collection
     */
    this.populate('players');
  }
  catch(e) { console.log('Find Error', e); }
});

module.exports = mongoose.model('teams', teams);