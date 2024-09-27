import pytest
from stacked_modal import StackedModal

def test_stacked_modal_initialization():
    stacked_modal = StackedModal()
    assert len(stacked_modal.modals) == 0

def test_stacked_modal_push():
    stacked_modal = StackedModal()
    stacked_modal.push('Test Content 1', 'Test Title 1')
    assert len(stacked_modal.modals) == 1
    assert stacked_modal.modals[-1].content == 'Test Content 1'
    assert stacked_modal.modals[-1].title == 'Test Title 1'
    stacked_modal.push('Test Content 2', 'Test Title 2')
    assert len(stacked_modal.modals) == 2
    assert stacked_modal.modals[-1].content == 'Test Content 2'
    assert stacked_modal.modals[-1].title == 'Test Title 2'

def test_stacked_modal_pop():
    stacked_modal = StackedModal()
    stacked_modal.push('Test Content 1', 'Test Title 1')
    stacked_modal.push('Test Content 2', 'Test Title 2')
    popped_modal = stacked_modal.pop()
    assert len(stacked_modal.modals) == 1
    assert popped_modal.content == 'Test Content 2'
    assert popped_modal.title == 'Test Title 2'
    assert stacked_modal.modals[-1].content == 'Test Content 1'
    assert stacked_modal.modals[-1].title == 'Test Title 1'

def test_stacked_modal_pop_empty():
    stacked_modal = StackedModal()
    assert stacked_modal.pop() is None

def test_stacked_modal_peek():
    stacked_modal = StackedModal()
    stacked_modal.push('Test Content 1', 'Test Title 1')
    stacked_modal.push('Test Content 2', 'Test Title 2')
    peeked_modal = stacked_modal.peek()
    assert len(stacked_modal.modals) == 2
    assert peeked_modal.content == 'Test Content 2'
    assert peeked_modal.title == 'Test Title 2'

def test_stacked_modal_peek_empty():
    stacked_modal = StackedModal()
    assert stacked_modal.peek() is None

def test_stacked_modal_is_empty():
    stacked_modal = StackedModal()
    assert stacked_modal.is_empty() == True
    stacked_modal.push('Test Content', 'Test Title')
    assert stacked_modal.is_empty() == False
