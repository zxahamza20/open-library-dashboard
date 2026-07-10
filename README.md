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

<img src='https://i.imgur.com/hxBBwrh.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with Kap for macOS  

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

# Web Development Project 6 - *📚 Open Library Analytics Dashboard*

Submitted by: **Hamza Munis**

This web app: **lets users explore a live dataset of ~5,000+ books pulled from the Open Library Search API across six genres (history, art, fantasy, science, fiction, non-fiction). The dashboard view provides filterable, paginated browsing with real-time summary statistics and two interactive charts — a subject distribution chart and a publication-decade trend chart, each toggleable between chart types (bar/pie, line/bar). Clicking any book navigates to a dedicated detail page with a unique URL, showing extended information (description, related subjects, cover art) fetched specifically for that book. The app uses React Router for client-side navigation between the dashboard and detail views, with a persistent sidebar shared across both. Data integrity was a deliberate focus throughout: rather than fabricating missing values (like unknown page counts), the app transparently labels gaps in the source data and explains its methodology on a dedicated About page.**

Time spent: **8** hours spent (+10 from part one so 18 hours) in total 

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [x] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

* [x] An about page which talks abou the limitations of the data returned by the API call and other details about it.
* [x] The sidebar has the option of jumping to prefiltered data by subjects, like fantasy, nonfiction, etc.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with Kap (MacOS)  

### Production Images

<img src='' title='' width='' alt='' />

## Notes

1. URL-unsafe characters in dynamic route params: The book keys contain slashes (/works/OL123W), so encodeURIComponent/decodeURIComponent had to match exactly on both ends because useParams() gave me garbage.

2. Missing/inconsistent fields: I already hit this with number_of_pages_median but the same pattern applied to description, subjects, covers so I had to guard against undefined because the data became almost 90% fabricated

3. ResponsiveContainer renders blank if its parent has no defined height: I lost an afternoon to a "chart just won't show up" bug which was an annoying CSS issue.

4. Recalculating chart data on every render instead of memoizing (useMemo): This was not a correctness bug, but caused visible lag once the dataset became a few thousand rows.

5. artial fetch failures: Promise.all across multiple subject requests fails entirely if even one request errors. It was worth deciding whether I wanted Promise.allSettled instead so one bad subject wouldn't blank the whole dashboard, because that kept happening.


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