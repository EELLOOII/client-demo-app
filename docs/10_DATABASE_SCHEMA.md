# Database Schema (Planned)

## Customer

- id
- name
- company
- email
- phone
- address
- status

## Product

- id
- sku
- name
- description
- categoryId
- price
- stock
- status
- images

## Category

- id
- name
- slug

## Inquiry

- id
- customerName
- company
- email
- phone
- subject
- message
- status

## Quotation

- id
- quotationNo
- customerId
- total
- status
- createdAt

## User

- id
- name
- email
- role
- status