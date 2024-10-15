import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });
});

describe("required sticky note", () => {
  test("read, all notes are displayed on page", () => {
    render(<StickyNotes />);

    dummyNotesList.forEach((note) => {
      const noteTitle = screen.getByText(note.title);
      expect(noteTitle).toBeInTheDocument();
    });
  });

  test("update, once update is done document object value updates", () => {
    render(<StickyNotes />);
    const noteTitle = screen.getByText("test note 1 title");
    fireEvent.blur(noteTitle, { target: { textContent: "Updated Title" } });

    const updatedNoteTitle = screen.getByText("Updated Title");
    expect(updatedNoteTitle).toBeInTheDocument();
  });

  test("delete, note is filtered out once X is pressed", () => {
    render(<StickyNotes />);

    const noteTitle = screen.getByText("test note 1 title");
    const deleteButton = screen.getAllByText("x")[0];
    fireEvent.click(deleteButton);
    expect(noteTitle).not.toBeInTheDocument();
  });

  test("Toggle Favorite Status", () => {
    render(<StickyNotes />);
    const favoriteButton = screen.getAllByText("♡")[1];
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton.textContent).toBe("♡");
    fireEvent.click(favoriteButton);
    expect(favoriteButton.textContent).toBe("♥");
    fireEvent.click(favoriteButton);
    expect(favoriteButton.textContent).toBe("♡");
  });

  test("Does not allow notes without titles", () => {
    render(<StickyNotes />);
    const createNoteContent = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
    fireEvent.change(createNoteContent, {target: {value: "Creating note without title"}});
    fireEvent.click(createNoteButton);
    const noteContent = screen.queryByText("Creating note wihtout a title")
    expect(noteContent).not.toBeInTheDocument();
  });

  test("Creation of sticky note", () => {
    render(<StickyNotes />);
    const createNoteTitle = screen.getByPlaceholderText("Note Title");
    const createNoteContent = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
    fireEvent.change(createNoteTitle, {target: {value: "New note title"}});
    fireEvent.change(createNoteContent, {target: {value: "New note content"}});
    fireEvent.click(createNoteButton);
    const newTitleContent = screen.queryByText("New note title");
    const newContent = screen.queryByText("New note content");
    expect(newTitleContent).toBeInTheDocument();
    expect(newContent).toBeInTheDocument();
  });

});

