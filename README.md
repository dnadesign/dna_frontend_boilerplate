# DNA Front-end boilerplate (Helix)

At DNA we're well known for producing well crafted and tailored design solutions
and our development team has always done the same with the code they've
produced. However as HTML and CSS is notoriously subjective, settling on a
specific way of doing things has been hard. We have worked on an approach to
CSS before (OOCSS) however that effort was largely undermined by responsive.

In the last two years the projects we've been working on have been getting
larger and larger and mostly responsive, which has put pressure on being able to
quickly scale a team and produce consistent results.

Now we've turned to a combination of BEM and atomic design. We believe this
enables developers to work together easily and produce consistent, professional,
maintainable results for clients.

This repository is not just a collection of our default styles and coding
conventions, it also includes a pattern lab of components to use and build
scripts to automate the creation of projects.

The goals of our front end pipeline are:

	* Mobile first (responsive is baked in).
	* Modular, component driven architecture.
	* Use existing libraries (bower, bootstrap)
	* Be predictable.
	* Reusable between projects.

## Installation

	// clone the module to somewhere on your machine
	git clone git@github.com:dnadesign/dna_frontend_boilerplate.git ~/dna-frontend-boilerplate

	// create a symlink in your $PATH to helix
	sudo ln -s ~/dna-frontend-boilerplate/bin/helix /usr/local/bin/helix

## Usage

Once you have installed Helix, you should be ready to setup your site. Go to an
existing folder and run the following:

	helix setup

This operation will create the default structure and outline we'll use.

At any time in the future if you want to update to the latest front end boiler
plate run:

	helix update

**Note this will wipe any of your local changes.**

Out of the box, helix will only generate a very small footprint of helpers and
components. Components are located inside the `build/components/` folder. These
components contain the CSS, Javascript and documentation to run and should, to
some extent, be encapsulated from the rest of the site so they can be reused.

A collection of components is provided by helix. To list all the components
available in helix use `helix list`.
