import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType('WebPage')
export class WebPageType {
    @Field({ nullable: true })
    title: string

    @Field({ nullable: true })
    description: string

    @Field({ nullable: true })
    image: string
}