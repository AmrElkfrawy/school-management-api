/** livedb holds a data in the process,
 * livedb is key-value db
 * manage thier expiration and syncs it with other processes using cortex
 * users of the live db can subscribe to specific collection and
 * the listener will be triggered if an item is added to the collection
 * newly added documents is populated over cortex
 * Do Not use it for high write inputs
 * Do Not use for large data sets
 * ideal for
 * - sharing configurations
 * the db is held in process memory, so don't use for large data sets
 * */

module.exports = class LiveDbManager {};
