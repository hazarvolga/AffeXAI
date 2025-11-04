# 🧪 Reusable Components Integration - End-to-End Test Guide

**Test Date**: 2025-01-XX
**Tester**: [Your Name]
**System**: Affexai CMS Visual Editor
**Phase**: Phase 1-3 Complete

---

## 📋 Test Checklist

### Prerequisites
- [ ] Backend running on port 9006
- [ ] Frontend running on port 9003
- [ ] Database has reusable components seeded
- [ ] User authenticated with admin/editor role

---

## 🎯 Test Scenario 1: Browse & View Reusable Components

**Objective**: Verify reusable components are fetched and displayed correctly

### Steps:
1. Navigate to CMS Editor: `http://localhost:9003/admin/cms/editor`
2. Open ComponentsLibrary (left panel)
3. Click on "Reusable" tab

### Expected Results:
- [ ] "Reusable" tab is the first category
- [ ] Loading spinner appears briefly
- [ ] Reusable components are displayed in cards
- [ ] Each card shows:
  - Component name
  - Description (truncated to 2 lines)
  - "Add to Page" button
  - Drag handle (top-left, visible on hover)
  - Actions menu (top-right, visible on hover)

### Screenshot: `test-1-reusable-tab.png`

---

## 🎯 Test Scenario 2: Add Reusable Component to Canvas

**Objective**: Verify drag-and-drop and click-to-add functionality

### Steps:
1. Select a reusable component from the list
2. **Method A**: Drag the component to the canvas
3. **Method B**: Click "Add to Page" button

### Expected Results:
- [ ] Component appears on canvas
- [ ] Visual "Reusable" badge displayed (blue, top-right)
- [ ] Component renders correctly with default props
- [ ] Toast notification: "Component Added"
- [ ] Component auto-selected (highlighted in canvas)

### Screenshot: `test-2-add-to-canvas.png`

---

## 🎯 Test Scenario 3: Edit Properties with DynamicFormGenerator

**Objective**: Verify property editing uses auto-generated forms

### Steps:
1. Click on a reusable component in the canvas
2. Open PropertiesPanel (right panel)
3. Switch to "Content" tab
4. Observe the form fields

### Expected Results:
- [ ] Header shows "Reusable Block: [blockId]"
- [ ] DynamicFormGenerator renders form fields automatically
- [ ] Field types match block schema:
  - Text inputs for strings
  - Textareas for long text
  - Sliders for numbers
  - Color pickers for colors
  - Media pickers for images
  - List builders for arrays
- [ ] Field labels are human-readable
- [ ] Changes reflect immediately on canvas

### Screenshot: `test-3-properties-panel.png`

---

## 🎯 Test Scenario 4: Save Changes to Library

**Objective**: Verify property changes are saved to database

### Steps:
1. Edit a property (e.g., change title text)
2. Observe canvas updates in real-time
3. Click "Save to Library" button (top-right in Content tab)
4. Wait for response

### Expected Results:
- [ ] Button shows "Saving..." with spinner
- [ ] Success toast: "Saved Successfully"
- [ ] Changes persist after refresh
- [ ] Other pages using this component will see updates

### Screenshot: `test-4-save-button.png`

---

## 🎯 Test Scenario 5: Duplicate Reusable Component

**Objective**: Verify component duplication functionality

### Steps:
1. In ComponentsLibrary, hover over a reusable component card
2. Click the 3-dot menu (⋮) icon
3. Select "Duplicate"
4. Wait for operation to complete

### Expected Results:
- [ ] New component appears in the list
- [ ] Name includes "Copy of Component" prefix
- [ ] Same props as original
- [ ] Toast notification: "Component Duplicated"
- [ ] List refreshes automatically

### Screenshot: `test-5-duplicate-menu.png`

---

## 🎯 Test Scenario 6: Export Reusable Component

**Objective**: Verify export to JSON functionality

### Steps:
1. Hover over a reusable component card
2. Click the 3-dot menu (⋮) icon
3. Select "Export"
4. Wait for download

### Expected Results:
- [ ] JSON file downloaded (e.g., `component-education-multi-layout.json`)
- [ ] File contains:
  - Component metadata (name, description, blockId)
  - Full props object
  - All configuration
- [ ] Toast notification: "Component Exported"

### Screenshot: `test-6-export-download.png`

---

## 🎯 Test Scenario 7: Import Components (Bulk)

**Objective**: Verify import from JSON functionality

### Steps:
1. Ensure "Reusable" tab is selected
2. Click "Import Components" button (top-right of header)
3. Select a JSON file (use previously exported file)
4. Confirm import

### Expected Results:
- [ ] File picker dialog opens
- [ ] Only `.json` files accepted
- [ ] After selection, import processes
- [ ] Toast notification: "Components Imported: Successfully imported X component(s)"
- [ ] Imported component(s) appear in the list
- [ ] List refreshes automatically

### Screenshot: `test-7-import-button.png`

---

## 🎯 Test Scenario 8: Delete Reusable Component

**Objective**: Verify deletion with confirmation

### Steps:
1. Hover over a reusable component card (use duplicated one)
2. Click the 3-dot menu (⋮) icon
3. Select "Delete" (red text)
4. Confirm in dialog

### Expected Results:
- [ ] Confirmation dialog appears: "Are you sure you want to delete..."
- [ ] Dialog shows component name
- [ ] "Cancel" and "Delete" buttons
- [ ] After confirmation:
  - Toast notification: "Component Deleted"
  - Component removed from list
  - List refreshes automatically

### Screenshot: `test-8-delete-dialog.png`

---

## 🎯 Test Scenario 9: Search Reusable Components

**Objective**: Verify search functionality

### Steps:
1. Type query in search bar (e.g., "education")
2. Observe filtered results

### Expected Results:
- [ ] Components filtered in real-time
- [ ] Both reusable and prebuild components included
- [ ] Search matches:
  - Component name
  - Description
- [ ] Empty state shown if no matches: "No components found"

### Screenshot: `test-9-search-results.png`

---

## 🎯 Test Scenario 10: Style Tab Behavior

**Objective**: Verify style properties are handled correctly

### Steps:
1. Select a reusable component on canvas
2. Open PropertiesPanel
3. Click "Style" tab

### Expected Results:
- [ ] Message displayed: "Style properties are handled in the Content tab"
- [ ] No duplicate form fields
- [ ] User directed to use Content tab

### Screenshot: `test-10-style-tab.png`

---

## 🎯 Test Scenario 11: Component Registry Integration

**Objective**: Verify blockId-based rendering

### Steps:
1. Add a reusable component with `blockId: 'education-multi-layout'`
2. Inspect component props in browser DevTools
3. Verify rendering

### Expected Results:
- [ ] Component props include `blockId` field
- [ ] EditorCanvas uses `blockId` to find React component
- [ ] Component renders using `componentRegistry[blockId]`
- [ ] "Unknown component type" NOT shown

### Browser Console Check:
```javascript
// Select component in canvas, then run:
console.log($r.props.blockId); // Should show: 'education-multi-layout'
```

---

## 🎯 Test Scenario 12: Error Handling

**Objective**: Verify graceful error handling

### Test Cases:

#### 12.1: Save Without reusableComponentId
1. Add a prebuild (non-reusable) component
2. Try to save (button should not appear)
3. **Expected**: No save button visible for non-reusable components

#### 12.2: Invalid Block Config
1. Add reusable component with invalid blockId
2. **Expected**: Error message: "Block configuration not found for: [blockId]"

#### 12.3: API Failure (Delete)
1. Turn off backend
2. Try to delete a component
3. **Expected**: Toast error: "Delete Failed: Failed to delete component. Please try again."

#### 12.4: Invalid Import File
1. Try to import a non-JSON file
2. **Expected**: Toast error: "Import Failed: Failed to import components. Please check the file format."

---

## 🎯 Test Scenario 13: Performance & UX

**Objective**: Verify smooth user experience

### Checks:
- [ ] No visual glitches during drag-and-drop
- [ ] Forms render instantly (<100ms)
- [ ] Canvas updates in real-time (no lag)
- [ ] Loading states shown appropriately
- [ ] No console errors in browser DevTools
- [ ] No TypeScript errors in VS Code

### Performance Metrics:
- Initial load time: _____ ms
- Component add time: _____ ms
- Property update time: _____ ms
- Save to database time: _____ ms

---

## 🐛 Bug Report Template

If you find any issues, report them using this format:

```markdown
### Bug #X: [Short Description]

**Severity**: Critical / High / Medium / Low
**Steps to Reproduce**:
1. ...
2. ...

**Expected Behavior**:
...

**Actual Behavior**:
...

**Screenshots**:
[Attach here]

**Console Errors**:
```
[Paste errors here]
```

**Environment**:
- OS:
- Browser:
- Backend: Port 9006
- Frontend: Port 9003
```

---

## ✅ Test Summary

**Total Tests**: 13 scenarios
**Passed**: ___ / 13
**Failed**: ___ / 13
**Blocked**: ___ / 13

**Overall Status**: ⬜ PASS / ⬜ FAIL

---

## 📊 Test Results

| Scenario | Status | Notes |
|----------|--------|-------|
| 1. Browse & View | ⬜ | |
| 2. Add to Canvas | ⬜ | |
| 3. Edit Properties | ⬜ | |
| 4. Save Changes | ⬜ | |
| 5. Duplicate | ⬜ | |
| 6. Export | ⬜ | |
| 7. Import | ⬜ | |
| 8. Delete | ⬜ | |
| 9. Search | ⬜ | |
| 10. Style Tab | ⬜ | |
| 11. Registry Integration | ⬜ | |
| 12. Error Handling | ⬜ | |
| 13. Performance & UX | ⬜ | |

---

## 🎉 Sign-Off

**Tested By**: ___________________
**Date**: ___________________
**Approved By**: ___________________

---

## 📚 Additional Notes

- All tests should be performed in both light and dark modes
- Test on different screen sizes (desktop, tablet)
- Verify browser compatibility (Chrome, Firefox, Safari)
- Check accessibility (keyboard navigation, screen readers)

**End of Test Guide**
