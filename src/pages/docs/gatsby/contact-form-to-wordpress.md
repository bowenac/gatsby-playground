---
title: "Submit form to WordPress"
---

You will need to install the following packages
```shell
npm install gatsby-plugin-apollo
npm install graphql-tag
npm install react-apollo
```

<br>

Then add a plugin to gatsby-config.js

```js
{
    resolve: 'gatsby-plugin-apollo',
    options: {
        uri: 'https://example.com/graphql'
    }
}
```

### Page with the form ###

```js
import React, { useState } from "react"
import Layout from "../components/layout"
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';

const CONTACT_MUTATION = gql`
    mutation CreateSubmissionMutation($clientMutationId: String!, $name: String!, $email: String!, $message: String!){
        createSubmission(input: {clientMutationId: $clientMutationId, name: $name, email: $email, message: $message}) {
            success
            data
        }
    }
`
const IndexPage = ({ data }) => {

    const [nameValue, setnameValue] = useState('')
    const [emailValue, setemailValue] = useState('')
    const [messageValue, setMessageValue] = useState('')

    return (
        <Layout>
            <section id="contact">
                <div class="container">
                    <div class="waypoint animate" data-animation="slide-in-left">
                        <h2>Hire Me, or just say hi!</h2>
                    </div>
                    <div>
                        <Mutation mutation={CONTACT_MUTATION}>
                            {(createSubmission, { loading, error, data }) => (
                                <React.Fragment>
                                    <form className="contact-form"
                                        onSubmit={async event => {
                                            event.preventDefault()
                                            createSubmission({
                                                variables: {
                                                    clientMutationId: 'homeContactForm',
                                                    name: nameValue,
                                                    email: emailValue,
                                                    message: messageValue
                                                }
                                            })
                                        }}
                                    >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    required
                                                    id='nameInput'
                                                    value={nameValue}
                                                    placeholder="Name"
                                                    onChange={event => {
                                                        setnameValue(event.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    required
                                                    id='emailInput'
                                                    value={emailValue}
                                                    placeholder="Email"
                                                    onChange={event => {
                                                        setemailValue(event.target.value)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <p>
                                            <textarea
                                                required
                                                id='messageInput'
                                                cols="40"
                                                rows="10"
                                                value={messageValue}
                                                placeholder="Message"
                                                onChange={event => {
                                                    setMessageValue(event.target.value)
                                                }}
                                            ></textarea>
                                        </p>
                                        <p>
                                            <button type="submit">Send</button>
                                            {loading && <p>Sending message...</p>}
                                            {error && <p>An unknown error has occured, please try again later... {error.message}</p>}
                                            {data && <p>Your message has been sent, thank you!</p>}
                                        </p>
                                    </form>
                                </React.Fragment>
                            )}
                        </Mutation>

                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default IndexPage
```

## WordPress Config ##

Install GraphQl Plugin in WordPress from https://github.com/wp-graphql/wp-graphql

Based on the above example, add the following function to functions.php

```php
//Process Form from Gatsby Site
add_action('graphql_register_types', function () {
	register_graphql_mutation('createSubmission', [
		'inputFields' => [
			'name' => [
				'type' => 'String',
				'description' => 'User Name',
			],
			'email' => [
				'type' => 'String',
				'description' => 'User Email',
			],
			'message' => [
				'type' => 'String',
				'description' => 'User Message',
			],
		],
		'outputFields' => [
			'success' => [
				'type' => 'Boolean',
				'description' => 'Whether or not data was stored successfully',
				'resolve' => function ($payload, $args, $context, $info) {
					return isset($payload['success']) ? $payload['success'] : null;
				}
			],
			'data' => [
				'type' => 'String',
				'description' => 'Payload of submitted fields',
				'resolve' => function ($payload, $args, $context, $info) {
					return isset($payload['data']) ? $payload['data'] : null;
				}
			]
		],
		'mutateAndGetPayload' => function ($input, $context, $info) {

			$to = 'address-to-send-to';
			$subject = 'Website Form Submission';
			$body = sanitize_text_field($input['message']);
			$headers[] = 'Content-Type: text/html; charset=UTF-8';
			$headers[] = 'Reply-To: '.sanitize_text_field($input['name']).' <'.sanitize_text_field($input['email']).'>';

			$form_submission = wp_mail( $to, $subject, $body, $headers );
			if ($form_submission){
				return [
					'success' => true,
					'data' => 'Sent'
				];
			}

		}
	]);
});
```