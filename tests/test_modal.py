import pytest
from modal import Modal

def test_modal_initialization():
    modal = Modal()
    assert modal.is_open == False
    assert modal.content == ''
    assert modal.title == ''

def test_modal_open():
    modal = Modal()
    modal.open('Test Content', 'Test Title')
    assert modal.is_open == True
    assert modal.content == 'Test Content'
    assert modal.title == 'Test Title'

def test_modal_close():
    modal = Modal()
    modal.open('Test Content', 'Test Title')
    modal.close()
    assert modal.is_open == False
    assert modal.content == ''
    assert modal.title == ''

def test_modal_toggle():
    modal = Modal()
    modal.toggle('Test Content', 'Test Title')
    assert modal.is_open == True
    assert modal.content == 'Test Content'
    assert modal.title == 'Test Title'
    modal.toggle()
    assert modal.is_open == False
    assert modal.content == ''
    assert modal.title == ''
