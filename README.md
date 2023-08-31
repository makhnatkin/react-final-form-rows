## React Final Form Rows
An alternative to the [final-form-arrays](https://github.com/final-form/final-form-arrays) library using normalized data instead of an array
* https://github.com/final-form/react-final-form/issues/336#issuecomment-1700237076
* https://github.com/final-form/final-form-arrays/pull/96

## API
Almost te same https://final-form.org/docs/final-form-arrays/api

## Examples

### Draggable example
https://codesandbox.io/s/react-final-form-rows-field-array-alternative-react-dnd-as-drag-drop-6vrpy6

Pay attention to the re-renders that occur only when adding a string. This happens because the array index is not recalculated. This approach also helps to solve other problems related to using the unshift method, for example.

![ezgif-4-9aa3917cd0](https://github.com/makhnatkin/react-final-form-rows/assets/1963954/e62df33c-f73f-46b3-a827-376d59168dc7)

