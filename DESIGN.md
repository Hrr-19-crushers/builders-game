# Project BuilderGame Design Doc
#### An internal document for determining the shape of play.

## Premise
Some poor soul (herby referred to as a survivor) has washed ashore on a desert island! With nothing but nature's bounty, they must eek out a living until help arrives. Unfortunately for our survivor, their decisions are left up to democracy.

Players vote via a chat system on our survivor's next action, all while exposure, hunger and the natural dangers of the island take their toll. 

## The Goal
Have your character survive as long as possible without:

* Starving or dying of thirst
* Falling prey to wildlife
* Ending up at the wrong side of a natural disaster
* Drowning

## Mechanics

>__Note:__ Headings marked with __(!?)__ may be considered __Not MVP Viable__ but are potentially important to the robustness of the game's interactions or interest factor.

### Voting
Voting via the chat occurs in rounds. Chats proceeded by a `#` are considered votes and should roughly conform to the possible actions a survivor can take.

Rounds generally last between __1 minute to 30 seconds__.

Voting rounds may not always be of the same length -- for instance, should a survivor become locked in combat with a particularly challenging crab, the votes may be polled for more quickly.

When a vote has concluded, the game processes the vote as an `action` and `target` __or__ as a straw poll `result`.

### Actions (verbs)
Survivors can take an action during each voting round. Here is a list of potential actions that could be taken:

* __Take:__ Grab an `item` or `creature`.
* __Hide:__ Take shelter at a `safe spot`.
* __Travel:__ Move to a different `location`. __(!?)__
* __Eat:__ Attempt to eat a held `item` or `creature`.
* __Drink:__ Drink from a `water source` or from a held `item`. __(!?)__
* __Attack:__ Attempt to kill a `creature`.
* Others as we deem them amusing. __(!?)__

__Note:__ An overly-permissive action system might be funnier, more worthwhile. Thus interactions should be robust.

### Targets (nouns)
The island has many entities the survivor can use their actions on. By default the survivor with path to the nearest one it can take it's `action` on.

* __Item:__ Any old thing lying on the ground. e.g. coconuts, sticks, logs, etc.
* __Creature:__ Wildlife (or other survivors __!?__).
* __Safe spots:__ Rocks to hide under, or survivor-made structures.
* __Locations:__ Other parts of the island.
* __Water source:__ A place where you can get water. __(!?)__

### Results
Occasionally players are prompted to answer a binary decision, rather than voting on an action.

### The Survivor
Has to worry about:

* Getting too tired __(!?)__
* Getting too hungry
* Getting too thirsty __(!?)__
* Getting too killed by tigers __(!?)__
* Challenging crabs

Timers on `exhaustion`, `hunger` and `thirst` tick down per voting round. As they deplete the survivor may become less effective. 

### The Island
##### This whole section should be considered __(!?)__.
Could be divided into locations, such as:

* The Beach
* Shoreside Forest
* The Volcano Slopes
* The Volcano Caldera
* A Tiger's Den
* A Shipwreck 

The initial location would probably be the beach where the survivor washes up.

## Server/Client State API Proposal

### Actions


### Votes
Requests recieved should follow this format for simplicity's sake:

```typescript
interface ActionVote { 
  action: ActionType;
  target: TargetType;
}

interface PromptVote {
  choice: boolean; //Potentially an enum of yea or nay? a or b?
}
```

The client, being a purely deterministic engine, will dictate how this is processed once accepted. 

The server, however, will determine if the action is legal or will result in a change of the survivor's or the islands state.

For example if a crab is killed, this will need to remain syncronized on the server so that new sessions will not have a crab that doesn't exist on anyone else's instance.

### Voting Results

```typescript
interface ActionResults {
  winner: ActionVote;
  votes: [ActionVote];
}

interface PromptResults {
  prompt: string;
  winner: PromptVote;
  votes: [PromptVotes]
}
```

## World State Storage

### World state events (!?)
Could include:

* Spawning new creatures, survivors, items
* 

## UI

## Reach goals

* Multiple survivors, that can interact.
* Timed and random events
* Multiple islands
* Game conclusion conditions
* Actions follow `verb -> noun` format, but could potentially have modifiers (`adjective`) to increase precision of vote
