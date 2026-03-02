/**
 * Typeahead Buffer
 *
 * A module-level synchronous buffer that captures keystrokes
 * before a note / TextInput is ready.  Using a plain JS variable
 * (not React state) guarantees every keystroke is captured in
 * order with zero async lag.
 *
 * `target` controls which field receives the buffered text
 * when SimpleTextEditor flushes.   Default is 'title' so that
 * typing on the home screen fills the note title.  Can be set
 * to 'body' (or any future field) before triggering.
 *
 * Flow:
 *  1. User presses a letter while no note is open.
 *  2. The global keydown handler calls pushKey() and setTriggered().
 *  3. Note creation + pane opening is kicked off (async React).
 *  4. Any further keys keep accumulating via pushKey().
 *  5. SimpleTextEditor mounts → calls flush() → gets the buffered
 *     string + target, writes it to the correct note field, focuses it.
 *  6. From that point the TextInput handles input natively.
 */

let _buffer = ''
let _triggered = false
let _target = 'title'   // 'title' | 'body'  (extensible)

/** Append a single character to the buffer. */
export const pushKey = (key) => { _buffer += key }

/**
 * Read and clear the buffer.
 * Returns { text, target } where target is the field to write to.
 */
export const flush = () => {
  const result = { text: _buffer, target: _target }
  _buffer = ''
  _triggered = false
  _target = 'title'
  return result
}

/** Whether note creation has already been triggered for this typing burst. */
export const isTriggered = () => _triggered

/** Mark that note creation has been triggered. */
export const setTriggered = () => { _triggered = true }

/** Set which note field the buffer should flush into. */
export const setTarget = (t) => { _target = t }
