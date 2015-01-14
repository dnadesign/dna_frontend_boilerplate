# DNA Frontend Boilerplate

At DNA we're well known for producing well crafted and tailored design solutions and our development team has always done the same with the code they've produced. However as HTML and CSS is notoriously subjective, settling on a specific way of doing things has been hard. We have worked on an approach to CSS before (OOCSS) however that effort was largely undermined by responsive. 

In the last two years the projects we've been working on have been getting larger and larger and mostly responsive, which has put pressure on being able to quickly scale a team and produce consistent results. 

The other part of this challenge is contractors. With any agency work flexes and shrinks, so contractors are a fact of life. However we do not want to introduce inconsistencies in how DNA produces work. We also want to be able to quickly communicate to contractors what and how we want things done in order to reduce code review and rework time and also improve efficiencies of working on larger front-end team.

Now we've turned to a combination of BEM and atomic design. We believe this will enable developers to work together easily and produce consistent, professional, maintainable results for clients.

### Setup folder structure

See the following git repo for the folder structure, initial css and helpers, plus a grunt file to bring it all together.
https://github.com/dnadesign/dna_frontend_boilerplate

### Step 2

Work through art circling components. Components can exist within components. For example header and nav_main may be separate components even though nav_main only occurs in header. 

### Step 3

Build components. There are three guiding principles which we follow in order to get great results.

#### Make CSS manageable

You should be able to look at a classname in firebug and see 2 things.
1. The component it belongs to
1. The breakpoint the style is coming from

You should then be able to open one file in order to edit some styles.

##### 1) Split CSS into components.

Each component name must be unique and descriptive.

The goal of components is easily identifiable and manageable code. Management of a component is directly correlated to number of lines per breakpoint, e.g 1000 lines is too much, 500 is pushing it.

While re-using a component across projects seems like a good goal, it's only a bonus. Try not to code with other projects in mind. Components may be used across projects but only as a starting point.

##### 2) New file for each breakpoint and resolution

* component_1.base.less
* component_1.base.retina.less
* component_1.small.less
* component_1.small.retina.less
* etc

These get built by grunt into a stylesheet for each breakpoint and a production stylesheet with all breakpoints. This enables development environments to link to the breakpoint stylesheets and quickly identify where styles are coming from.

##### 3) Use multiple classes not single class patterns

	<a class="btn btn__secondary"></a>
is better than

	<a class="btn_secondary"></a>

While in the latter the HTML is simpler, it reduces flexibility. We want lots of modifiers in a component to create a range of scenarios. The original example assumes there's only one type of modifier. Once this is not the case the single class pattern breaks.

	<a class="btn btn__secondary btn__large"></a> 
is better than

	<a href="btn_secondary_large"></a>

##### 4) Pages or page types are not components. 

Do not put classes on the body element or similar in order to style a page. This approach should only be used in rare circumstances.

##### 5) Put javascript with css

Global javascript should go in build/global/js, this includes things like jQuery. Whereas javascript for carousel's should go in the carousel component folder. This also has the advantage or taking a component folder into a different project and having most of the assets you need.


#### Make CSS contained

CSS bleed is one of the most confusing parts of managing a large project. When you depend styles coming from a range of sources to style a chuck on the DOM then it gets very tricky to debug and add to styles.

We want the components we've created to exist with as little dependancies as possible. They should inherit the global tag styles but define everything else themselves.

Nesting components will happen so we need to make sure the outer component doesn't affect the inner component's style.

##### 1) Each class within a component must start with the component name and an underscore.

For example .sidebar .sidebar_title NOT .sidebar .title

Although the latter seems better as it's simpler, and you can namespace your css to encapsulate bleed, it still bleeds.

If two components have .title, and one of them is nested in another then the outer component's styling for .title will bleed into the inner component's .title.

Therefore all classnames inside a component must be prefixed by the component's name, e.g. .sidebar_title NOT .title 

##### 2) Component parts are not the same as component modifiers

Component or component part modifiers should be highlighted by double underscores. Whereas component parts should be denoted with single underscores.

	<a class="btn btn__secondary btn__large">
		<span class="btn_arrow">&nbsp;</span>
	</a>

Also note that component parts should always be classed. If a tag is styled then the style can bleed through to a component that's nested inside.

##### 3) Don't style other components within another component.

When a component is nested inside another it's tempting to style that component based on context, e.g. .products .btn

This makes code very hard to comprehend, as one component is dependant on another component folder to style it correctly.

In this situation create a new modifier for the component in the original component folder. For example .btn.btn__products

##### 4) Don't style tags

Style tags like .header li seems harmless at first however it's a bad habit which starts becoming a major pain once components begin nesting.

If an \<a\> is styled in the outer component, that style will normally flow through to the inner component. However we don't want this to happen. We want each component to be independant. If the css uses a rule like: .header a then the independence will be lost.

Every CSS rules in a component folder should be styling a classname not a tag. This means components will not affect each others styling in any way.


#### Make CSS consistent

Having consistent rules which each developer abodes by means that teams can quickly scale without introducing confusion about how a component works.

##### 1) Class names should contain only underscores, no hyphens or camelCase.

Just convention, however underscores also makes the class easier to select, as one click selects the whole class, rather than a word at a time.

##### 2) Browser hacks should be class based rather than hack based and should be with original code.

Separate browser stylesheets make code hard to debug as developers need to piece together what is happening. Therefore the following example is what should happen.

	h2 {
		color: blue
	}
	.ie7 h2 {
		color: red
	}

The downside to this approach hits home with responsive. As .ie7 h2 can't be overridden in the next stylesheet without using the same specificity.

	h2,
	.ie7 h2 {
		color: green
	}

The work-around for this will be adding a class on the HTML element called "all". This means the following will override the initial styles.

	.all h2 {
		color: green;
	}

##### 3) Use Mixins sparingly. 

Mixins can overall bloat to CSS, consider carefully when you use them. If your mixing is above 5 lines of CSS then it should probably just be a component, or part of a component. Using mixins for rounded-corners, drop-shadows etc is a perfectly good use case. 

##### 4) Use nesting sparingly.

If using a pre-processor don't nest more the 3 times if possible. This simplifies resulting css rules and makes specificity easier.


##### 5) Only use IDs when necessary  

IDs are fine in the following contexts.
* Forms
* Anchors

IDs should not be used as a styling tool

##### 6) General style guidelines

* { on same line as selector
* space between rule and brace (.asd { NOT .asd{)
* Properties on new line, even if it's a single property.
* Properties in alphabetical order. This helps reduce the chance of double declaring a property and helps readability.
* space between property and value colon ("display: none" NOT "display:none")
* 1 line between rules
* JS files that aren't minified should be *.src.js and minified should be *.min.js
* 4 space tabs should be used in files.



### Workflow

This is particularly important for responsive. We want mobile first to be the outcome we want, where the first stylesheet doesn't have a media query and subsequent stylesheets have rules which add to or override the styles setup already.

In terms of workflow we've found that working on larger sizes first helps. This may sound strange however building the most complex HTML first results in less re-work. 

1. Build the large sizes, in the smallest breakpoint, so the site doesn't resize. 
1. Then look at the small design.
1. Start moving rules that only apply to larger sizes up to the appropriate breakpoint file.
1. Re-define what it should look at small sizes.
1. Rinse and repeat.


### Further reading

<ul>
<li><a href="http://nicolasgallagher.com/about-html-semantics-front-end-architecture/">Nicolas Gallagher on BEM</a></li>
<li><a href="http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/">CSS Wizardary on BEM</a></li>
<li><a href="http://bradfrostweb.com/blog/post/atomic-web-design/">Brad Frost on atomic design</a></li>
<li><a href="http://coding.smashingmagazine.com/2013/08/02/other-interface-atomic-design-sass/">Robin Rendle on atomic Design on Smashing magazine</a></li>
</ul>
