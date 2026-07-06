# Web Development Project 5 - *📚 Open Library Analytics Dashboard*

Submitted by: **Hamza Munis**

This web app: **is an interactive data dashboard that connects to the Open Library API to analyze publication records across multiple literary genres. It allows users to dynamically search, categorize, and bound-filter over 100 historical and creative volumes while instantly computing high-level summary statistics.**

Time spent: **10** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - *insert details here*
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [x] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] N/A

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

### Production Images

**Default**
<img src='https://i.imgur.com/dbZ1cWD.jpeg' title='Default' width='100%' alt='Default' />

**Filtering by input text**
<img src='https://i.imgur.com/mB6NbaT.png' title='Filtering by input text' width='100%' alt='Filtering by input text' />

**Multiple Filters Applied + Bounds**
<img src='https://i.imgur.com/WT5MNyO.png' title='Multiple Filters Applied' width='100%' alt='Multiple Filters Applied' />

**Getting Non-Fiction**
<img src='https://i.imgur.com/OiYZoU3.png' title='Getting Non-Fiction' width='100%' alt='Getting Non-Fiction' />

## Notes

1. The biggest challenge was adding the pagination because rendering 1000s of entries on each reload took a toll on the browser and took a while as the cache filled but in the end I could not add it after all so I oput it as a todo for part 2.

2. The second biggest challenge was finding the correct API, one with high limit and lower difficulty of usage. The marvel API and the recipe API were both fun to work with but hit the limit very fast so I went with the open book API, since this is a raw JSON and no actual API key needed to be used, I could render 10000+ items easily (I scrapped the idea because it took too long and lagged when filters were applied).

3. This time i was unable to work on the project at all during the regular time limit so I had to utilize the 48 hour extnesion and in order to finish as fast as I could, many areas on the webpage are crude, as in not styled enough to look pleasing to the eyes, and the whole app is just minimally styled (I will have to do most of the cleanup, more feature implemntation, and the decent styling for part 2 after class this week).

## License

    Copyright [2026] [Hamza Munis]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.