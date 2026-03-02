/**
 * Typeahead Buffer
 *
 * A module-level synchronous buffer that captures keystrokes
 * before a note / TextInput is ready.  Using a plain JS variable
 * (not React state) guarantees every keystroke is captured in
 * order with zero async lag.
 *
 * Flow:
 *  1. User presses a letter while no note is open.
 *  2. The global keydown handler calls pushKey() and setTriggered().
 *  3. Note creation + pane opening is kicked off (async React).
 *  4. Any further keys keep accumulating via pushKey().
 *  5. SimpleTextEditor mounts → calls flush() → gets the buffered
 *     string, writes it to the note body, focuses the TextInput.
 *  6. From that point the TextInput handles input natively.
 */

let _buffer = ''
let _triggered = false

/** Append a single character to the buffer. */
export const pushKey = (key) => { _buffer += key }

/**
 * Read and clear the buffer.
 * Returns the accumulated string (may be empty).
 */
export const flush = () => {
  const text = _buffer
  _buffer = ''
  _triggered = false
  return text
}

/** Whether note creation has already been triggered for this typing burst. */
export const isTriggered = () => _triggered

/** Mark that note creation has been triggered. */
export const setTriggered = () => { _triggered = true }
