# Team Process

Now that you've logged in and played around with our Dawson system a bit on a deployed environment, let's talk about our team process and what is expected from our fellow teammates.  This part of the documentation should help members get on the same page when it comes to the soft-skills required to work as a well-oiled agile machine.

## Working Agreement

We have talked about writing some form of working agreement so team members have a common understanding of what is expected from them during their daily work.  Great teams strive for open communication, safe spaces to speak their mind, and continuous improvement in process.  Embracing some of the following ideologies will help grow and sustain a healthy team.

### Vision Statement

For parties, practitioners, Court staff, and the public at large, DAWSON is a one-stop app that makes working with the USTC secure, efficient, and reliable; DAWSON empowers all of its users with an accessible, frictionless experience and sets the standard for how to engage with and manage the administration of justice.

### Mission Statement

The mission of the DAWSON Product Team is to continue to add and improve functionality that gives the US Tax Court, its constituents and the public an easy, efficient and simple way to access and manage cases. The DAWSON team uses Agile principles, clean architecture practices, test driven development, and team collaboration to identify, ideate on and deliver high-quality solutions that give users confidence in the system and increase transparency for the US Tax Court. Unlike previous legacy systems, DAWSON empowers petitioners and the Court by providing increased accessibility into Court data, is web-based and can be accessed from anywhere there’s Internet, and is built for scalability.

### Core Values

1. Respect and Appreciation - Respect and appreciation are basic human values that positively impact other areas like performance, workplace enjoyment, and team relationships.
2. Communication - As a team we value open and honest communication between team members in all aspects of work.
3. Knowledge Sharing - We value sharing as much knowledge as possible with team members to allow us to build a quality product.
4. Experimentation - Because we don’t know what we don’t know, we can’t give a clear cut answer/solution. By experimenting it increases optionality and helps us learn/reveal what we don’t know through the process of elimination. Sometimes multiple experiments are needed and failures can inform successes.
5. Quality - It's a fundamental value that ensures confidence, enables users at all levels to effectively achieve their goals (perform their duties). We strive to develop processes that increase the overall quality of our code and product.
6. Psychological Safety - Team members should feel safe to explore their ideas. Psych safety in a team ensures that all paths are seen as viable, therefore helping generate options in order to find the most effective and high quality path forward. Mistakes are valued as learning opportunities and failure generates more knowledge
Team Relationship Building - We encourage trust, strengthen our comfort in communicating with others, diversity of opinions, and foster empathy.

### How We Work

1. Methods of Communication: Slack is the preferred messaging platform. Our Slack workspace is organized into rooms with clear topics for focused discussion. The team maintains a #welcome channel with a directory of channels with clear descriptions and posting guidelines.

2. Retrospective: We retrospect often, following up on past experiments and other topics and coming up with future experiments to improve the team and project. We courageously bring topics to the retro in a psychologically safe space.

3. Meetings: Bring attention to questions or comments in the zoom chat to the presenter, as they are not always able to see them.  While zooming, we value the relationship benefits of cameras on, but also respect the right to have cameras off.  When creating meeting invites, be respectful of other people's time. This includes only inviting those who will find value in the meeting, and marking attendees as optional where appropriate. Care should also be taken to schedule during attendees' core working hours and not overlap with previously scheduled meetings.

4. Voting: As a team we will use multiple methods of voting for decision making within the team. The team will use Roman voting for quick feedback from the group on a singular topic. The team will use dot voting for discussions that have a variety of options to choose from in order to narrow down to a smaller list of actionable items.  Planning poker will be the tool we will use for estimation voting on the urgency and importance in regards to the DevEx/OpEx backlog.

5. Verbal Communication: Do your share of listening, and then verbally ask questions when you don’t understand.  Use the hand raising mechanism in Zoom to draw attention to your question.  Verbally checking for understanding is better than assuming.  Verbalize your concerns because others feel the same way.  Sometimes verbal communication doesn’t work, so try other communication mechanisms.

### How We Code

1. Smoke and integration tests are accurate to real life scenarios.
2. We don't merge a PR unless its associated build is passing and the PR as at least one approval.
3. When merge conflicts are encountered, we post in the public channel so that no team members feel left out and can help with resolution.
4. When a bug-fix or story has unexpected side-effects, reach out to the assignee of that issue so they can address the feedback.
5. UX will collaborate with engineering when a technical issue arises over a design, before and during development.
6. For all code and bugs, write a failing test  that covers the desired behavior, implement the desired behavior so the test passes, and refactor as needed.

### Flexion Fundamentals

For Flexioneers, remember to read and apply the flexion fundamentals to your daily work.  Doing so will help you write higher quality software, and it should help you grow as a person in general.

[https://flexion.us/flexion-fundamentals/](http://fundamentals.flexion.us/)

### Pair / Mob Programming

A majority of stories and bug we work on should be tackled using pair or mob programming.  The reason we utilize this type of programming is because it produces higher quality software, helps developers find defects in a shorter feedback loop, increases creativity, and strengthens knowledge sharing.  Remember, **cooperation** and **communication** are keys to *success*.

> Two minds are better than one.

### Quality over Speed

It has been made clear many times by the Court that producing high quality software (low defects, easy to manage and understand) is far more important than quickly delivering features.  All code should be covered with all forms of testing (unit, integration, smoke testing), we should be spending 20% of our sprints refactoring code, documentation should always be written or updated, and stories should not be considered done until after meeting our Definition of Done criteria.

> 20% of our time should be spent refactoring

## Agile Meetings

We strive to be keep our project as Agile as possible.  This means that every sprint we follow the typical scrum ceremonies to allow our team to plan for the upcoming work without planning too far ahead.  If you are already an expert in Agile, you may want to skim over this section, but since every team incorporates Agile processes their own way it might be worth a read through.

### Daily Standup

Since we strive to work in pairs and mobs, our stand ups focus more on group goals.  Every morning we meet to talk about our goals for our current sprint and also talk about our story goals for the day.  We setup **parking lot** items to give an opportunity to discuss any important topics that the entire team should be aware of.  We will often give small demos of story / bug progress to the Tax Court.

- Time of Ceremony: 9:30 AM CT
- Frequency of Ceremony: Daily Monday through Friday

### Sprint Retrospective

The retrospective is performed at the end of the sprint and offers the team a time to reflect on what went well or what they’d like to improve.

- Time of Ceremony: 2:30-4:00 CT
- Frequency of Ceremony: Every other week Tuesday

### Sprint Planning/Refinement

We have combined our grooming and planning into one event. During this meeting we groom stories for the sprint. While a sprint is 2 weeks, we groom every week to allow for shifting PO priorities.

- Time of Ceremony: 11:30-12:00 PM CT
- Frequency of Ceremony: Every Tuesday

### OpEx/DevEx Backlog Review

A meeting for the team to review the backlog of larger refactoring items and point for priority (importance/urgency).

Refactoring backlog: <https://trello.com/b/9tgrIFfA/ef-cms-opex-devex>

- Time of Ceremony: 2:00-3:00 PM CT
- Frequency of Ceremony: Every 2 weeks on Monday

### Epic Refinement

- Time of Ceremony: 2:00-3:00 PM CT
- Frequency of Ceremony: Ad hoc meeting

### Refactoring Backlog

TODO
