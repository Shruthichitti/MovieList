import React from 'react';
import App from './App';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import 'jest-dom/extend-expect';

const renderApp = () => render(<App/>);

afterEach(() => {
  fetchMock.restore();
  cleanup()
});

test('initial UI is rendered as expected', () => {
	let { getByTestId, queryByTestId } = renderApp();
	expect(getByTestId('app-title')).toHaveTextContent('Movie List');
	expect(getByTestId('app-input')).toHaveValue(null);
  expect(getByTestId('submit-button')).toHaveTextContent("Search");
  expect(getByTestId('movieList').childNodes).toHaveLength(0);
  expect(queryByTestId('no-result')).toBe(null);
});

test('search is made on by clicking on search button and no results found', async() => {
	let { getByTestId, queryByTestId } = renderApp();
  let input = getByTestId('app-input');
  let searchButton = getByTestId('submit-button');

  const url = 'https://jsonmock.hackerrank.com/api/movies?Year=1996';
  fetchMock.getOnce(url, JSON.stringify({ page:1,per_page:10,total:0,total_pages:0,data:[{"Title":"Aquaman: War of the Water Worlds","Year":1996,"imdbID":"tt1064720"},{"Title":"Maze bakunetsu jikû OVA","Year":1996,"imdbID":"tt1985142"},{"Title":"Freddi Fish and Luther's Maze Madness","Year":1996,"imdbID":"tt4844500"},{"Title":"Harry och Sonja","Year":1996,"imdbID":"tt0116494"},{"Title":"Lollipops and Sweet Chicks 5: Harry in England","Year":1996,"imdbID":"tt0327999"},{"Title":"Harry Anderson: The Tricks of His Trade","Year":1996,"imdbID":"tt1339306"},{"Title":"Sin","Year":1996,"imdbID":"tt0130298"},{"Title":"Deadly Sin","Year":1996,"imdbID":"tt0319269"},{"Title":"Sin-A-Matic","Year":1996,"imdbID":"tt0238603"},{"Title":"Guilty as Sin","Year":1996,"imdbID":"tt0392074"}]}));
  fireEvent.input(input, {
		target: { value: 1996}
	});
  fireEvent.click(searchButton);

  await wait(() => {
    const results = queryByTestId('movieList');
    expect(results.childNodes).toHaveLength(10);
    expect(results.childNodes[0]).toHaveTextContent('Aquaman: War of the Water Worlds');
    expect(results.childNodes[1]).toHaveTextContent('Maze bakunetsu jikû OVA');
    expect(results.childNodes[2]).toHaveTextContent(`Freddi Fish and Luther's Maze Madness`);
    expect(results.childNodes[3]).toHaveTextContent('Harry och Sonja');
    expect(results.childNodes[4]).toHaveTextContent('Lollipops and Sweet Chicks 5: Harry in England');
    expect(results.childNodes[5]).toHaveTextContent('Harry Anderson: The Tricks of His Trade');
    expect(results.childNodes[6]).toHaveTextContent('Sin');
    expect(results.childNodes[7]).toHaveTextContent('Deadly Sin');
    expect(results.childNodes[8]).toHaveTextContent('Sin-A-Matic');
    expect(results.childNodes[9]).toHaveTextContent('Guilty as Sin');
    expect(queryByTestId('no-result')).toBe(null);
  });
});


test('search is made on by clicking on search button and result found - test 1', async() => {
	let { getByTestId, queryByTestId } = renderApp();
  let input = getByTestId('app-input');
  let searchButton = getByTestId('submit-button');

  const url = 'https://jsonmock.hackerrank.com/api/movies?Year=2015';
  fetchMock.getOnce(url, JSON.stringify({ page:1,per_page:10,total:0,total_pages:0,data:[{"Title":"The Death of Spiderman","Year":2015,"imdbID":"tt5921428"},{"Title":"Beat Feet: Scotty Smiley's Blind Journey to Ironman","Year":2015,"imdbID":"tt5117146"},{"Title":"Maze Runner: The Scorch Trials","Year":2015,"imdbID":"tt4046784"},{"Title":"Into the Grizzly Maze","Year":2015,"imdbID":"tt1694021"},{"Title":"Maze Runner: The Burn Trials","Year":2015,"imdbID":"tt4844320"},{"Title":"A Mind Devoid of Happiness or: The Maze","Year":2015,"imdbID":"tt5037380"},{"Title":"Lard and the Peace Maze","Year":2015,"imdbID":"tt5046522"},{"Title":"Macau Stories III: City Maze","Year":2015,"imdbID":"tt5603106"},{"Title":"Harry Price: Ghost Hunter","Year":2015,"imdbID":"tt4974584"},{"Title":"Harry & Snowman","Year":2015,"imdbID":"tt2898306"}]}));
  fireEvent.input(input, {
		target: { value: 2015}
	});
  fireEvent.click(searchButton);

  await wait(() => {
    const results = queryByTestId('movieList');
    expect(results.childNodes).toHaveLength(10);
    expect(results.childNodes[0]).toHaveTextContent('The Death of Spiderman');
    expect(results.childNodes[1]).toHaveTextContent(`Beat Feet: Scotty Smiley's Blind Journey to Ironman`);
    expect(results.childNodes[2]).toHaveTextContent('Maze Runner: The Scorch Trials');
    expect(results.childNodes[3]).toHaveTextContent('Into the Grizzly Maze');
    expect(results.childNodes[4]).toHaveTextContent('Maze Runner: The Burn Trials');
    expect(results.childNodes[5]).toHaveTextContent('A Mind Devoid of Happiness or: The Maze');
    expect(results.childNodes[6]).toHaveTextContent('Lard and the Peace Maze');
    expect(results.childNodes[7]).toHaveTextContent('Macau Stories III: City Maze');
    expect(results.childNodes[8]).toHaveTextContent('Harry Price: Ghost Hunter');
    expect(results.childNodes[9]).toHaveTextContent('Harry & Snowman');
    expect(queryByTestId('no-result')).toBe(null);
  });
});

test('search is made on by clicking on search button and result found - test 2', async() => {
	let { getByTestId, queryByTestId } = renderApp();
  let input = getByTestId('app-input');
  let searchButton = getByTestId('submit-button');

  const url = 'https://jsonmock.hackerrank.com/api/movies?Year=2010';
  fetchMock.getOnce(url, JSON.stringify({ page:1,per_page:10,total:0,total_pages:0,data:[{"Title":"Spiderman","Year":2010,"imdbID":"tt1785572"},{"Title":"The Maze","Year":2010,"imdbID":"tt1675758"},{"Title":"Navigating the Maze","Year":2010,"imdbID":"tt4157206"},{"Title":"A Place in the Maze","Year":2010,"imdbID":"tt1630292"},{"Title":"The Black and White Maze of the Painted Zebra","Year":2010,"imdbID":"tt1722462"},{"Title":"Harry Potter and the Deathly Hallows: Part 1","Year":2010,"imdbID":"tt0926084"},{"Title":"Harry Potter and the Forbidden Journey","Year":2010,"imdbID":"tt1756545"},{"Title":"Who Is Harry Nilsson (And Why Is Everybody Talkin' About Him?)","Year":2010,"imdbID":"tt0756727"},{"Title":"Lego Harry Potter: Years 1-4","Year":2010,"imdbID":"tt1454016"},{"Title":"I Am Harry Potter","Year":2010,"imdbID":"tt1810644"}]}));
  fireEvent.input(input, {
		target: { value: 2010}
	});
  fireEvent.click(searchButton);

  await wait(() => {
    const results = queryByTestId('movieList');
    expect(results.childNodes).toHaveLength(10);
    expect(results.childNodes[0]).toHaveTextContent('Spiderman');
    expect(results.childNodes[1]).toHaveTextContent('The Maze');
    expect(results.childNodes[2]).toHaveTextContent('Navigating the Maze');
    expect(results.childNodes[3]).toHaveTextContent('A Place in the Maze');
    expect(results.childNodes[4]).toHaveTextContent('The Black and White Maze of the Painted Zebra');
    expect(results.childNodes[5]).toHaveTextContent('Harry Potter and the Deathly Hallows: Part 1');
    expect(results.childNodes[6]).toHaveTextContent('Harry Potter and the Forbidden Journey');
    expect(results.childNodes[7]).toHaveTextContent(`Who Is Harry Nilsson (And Why Is Everybody Talkin' About Him?)`);
    expect(results.childNodes[8]).toHaveTextContent('Lego Harry Potter: Years 1-4');
    expect(results.childNodes[9]).toHaveTextContent('I Am Harry Potter');
    expect(queryByTestId('no-result')).toBe(null);
  });
});
