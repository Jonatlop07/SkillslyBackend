# Generated by Django 2.2.12 on 2022-04-21 02:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skillsly_service_ms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='provider_id',
            field=models.IntegerField(blank=True, null=True, verbose_name='provider_id'),
        ),
    ]
